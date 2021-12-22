import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { usePDF } from "../contexts/usePDF";
import { ParkValue } from "../interfaces";
import styles from '../styles/pdf.module.scss'

const PDF = () => {

  const { getCurrentPDF } = usePDF();
  const [data, setData] = useState<null | ParkValue>(null);
  const [showButton, setShowButton] = useState(true)
  const printRef = useRef(null);

  useEffect(() => {
    (async () => {
      const response = await getCurrentPDF();
      if (response) {
        setData(response)
      }
    })()
  }, []);

  function FormatPrice(str: any) {
    str = str.replace(/\./g, '')
    str = str.replace(/,/g, '.')
    return Number(str);
  }

  const handlePrint = useReactToPrint({
    content: () => { setShowButton(false); return printRef.current },
  });

  const getPageMargins = () => {
    return `@page { margin: ${"2rem"} ${"4rem"} ${"2rem"} ${"4rem"} !important; }`;
  };

  return (
    <div className={styles.container} >
      <div ref={printRef}>
        <header className={styles.header}>
          <img src="/logo.png" alt="logo" />
          <div>
            <p>Razão Social: Brinquedos Schultze Ltda</p>
            <p>CNPJ: 82.601.568/0001-22</p>
            <p>Inscrição Estadual: 250.220.008</p>
            <p>Rodovia SC 418 km 04, número 3485 - 89239400</p>
            <p>Joinville/SC (Pirabeiraba)</p>
          </div>
        </header>
        <section className={styles.general}>
          <h1>ORÇAMENTO</h1>
          <p><strong>Itens do Pedido:</strong> {data?.totalParks} parque{data?.totalParks && data?.totalParks > 1 ? "s" : ""}</p>
          <p><strong>Cliente:</strong> {data?.user}</p>
          <p><strong>Endereço do Cliente:</strong> {data?.cep}</p>
        </section>
        <section className={styles.data}>
          <h2>DADOS DO PEDIDO</h2>
          {
            data?.parks.map((park, index) => {
              return (
                <div key={index}>
                  <h3>Parque {index + 1} - {park.name}</h3>
                  <p>Itens:</p>
                  <ul>
                    {
                      park.items.map((value, index) => {
                        return (
                          <li key={index}>{value.name}</li>
                        )
                      })
                    }
                  </ul>
                  <p>Características do parque:</p>
                  <ul>
                    <li>Medida do equipamento: {park.equipment};</li>
                    <li>Área de circulação: {park.area};</li>
                    <li>Idade: {park.age};</li>
                    <li>Material: {park.material};</li>
                    <li>Pintura: {park.painting}.</li>
                  </ul>
                  {park.observations && <p style={{ marginBottom: 10 }}>Observações adicionais: {park.observations}</p>}
                  <p>Valor do parque: {park.value}</p>
                  <p style={{ marginBottom: 10 }}>Valor de instalação: {park.valueInstall}</p>
                  <p>Valor total: {new Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format((FormatPrice(park.value) + FormatPrice(park.valueInstall)))}</p>
                </div>
              )
            })
          }
        </section>
        <section className={styles.general}>
          <h2>PRAZO DE ENTREGA</h2>
          <p>Data: {data?.deadline}</p>
        </section>
        <section className={styles.general}>
          <h2>CONDIÇÕES DE PAGAMENTO</h2>
          <p>Parcelas: <strong>{data?.payment}x de {data?.totalValue && new Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format((data?.totalValue/Number(data?.payment)))}</strong></p>
          <p>Valor total dos {data?.totalParks} parque{data?.totalParks && data?.totalParks > 1 ? "s" : ""} instalados: <strong>{data?.totalValue && new Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(data?.totalValue)}</strong></p>
        </section>
        <footer className={styles.footer}>
          <p>
            Atencionsamente,
            <br/><br/>
            Jean Carlo Schultze
            <br/><br/>
            Brinquedos Schultze Ltda
            <br/>
            <img src="/signature.jpeg" alt="assinatura" />
            <br/>
            Joinville {new Date().toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          })}
          </p>
        </footer>
      </div>
      <div className={styles.printButton}>
        <button onClick={handlePrint}>Imprimir</button>
      </div>
      <style type="text/css" media="print">{"\
  @page {\ size: portrait;\ }\
"}</style>
<style>{getPageMargins()}</style>
    </div>
  )
}

export default PDF;