import type { NextPage } from 'next'
import { useState } from 'react'
import styles from '../styles/Home.module.scss'
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ParkValue } from '../interfaces';
import Item from '../components/Item';
import { BsTrash } from 'react-icons/bs'
import { usePDF } from '../contexts/usePDF';
import { useRouter } from 'next/router';

const Home: NextPage = () => {

  const [budgetType, setBudgetType] = useState<null | string>(null);

  const createBudgetSchema = yup.object().shape({
    user: yup.string().required("Cliente obrigatório"),
    cep: yup.string().required("CEP obrigatório"),
    deadline: yup.string().required("CEP obrigatório"),
    payment: yup.string().required("CEP obrigatório"),
    parks: yup.array().of(
      yup.object().shape({
        items: yup.array().of(
          yup.object().shape({
            name: yup.string().notRequired(),
          })
        ),
        equipment: yup.string().required("Medida do equipamento obrigatória"),
        name: yup.string().required("Nome do parque obrigatório"),
        painting: yup.string().required("Pintura obrigatória"),
        area: yup.string().required("Área de circulação obrigatória"),
        age: yup.string().required("Idade obrigatória"),
        material: yup.string().required("Material obrigatório"),
        value: yup.string().required("Valor dos items obrigatório"),
        valueInstall: yup.string().required("Valor de instalação obrigatório")
      })
    )
  })

  const { control, handleSubmit, register, formState } = useForm<ParkValue>({
    resolver: yupResolver(createBudgetSchema)
  })

  const { fields, remove, append } = useFieldArray<ParkValue>({ name: "parks", control });
  const router = useRouter();

  async function handleCreateBudget(data: ParkValue) {
    data.totalParks = fields.length;
    setCurrentPDF(data)
    router.push('/pdf');
  }

  const {setCurrentPDF} = usePDF();

  return (
    <div className={styles.container}>
      <h1>Preencha os dados de seu orçamento</h1>
      <section className={styles.type}>
        <h2>Selecione o tipo</h2>
        <button type="button" onClick={() => setBudgetType("Parque")}>Parque</button>
      </section>
      <img src="/christmas.svg" alt="christmas" className={styles.image} />
      {
        budgetType === "Parque"
        &&
        <form onSubmit={handleSubmit(handleCreateBudget)} className={styles.form}>
          <h2>Dados básicos</h2>
          <div className={styles.summary}>
            <div className="inputFields">
              <label htmlFor="user">Cliente</label>
              <input
                id="user"
                type="text"
                placeholder='Nome da empresa ou cliente'
                {...register("user")}
              />
              <p>{formState.errors.user ? formState.errors.user.message : " "}</p>
            </div>
            <div className="inputFields">
              <label htmlFor="cep">Endereço do cliente</label>
              <input
                id="cep"
                type="text"
                {...register("cep")}
              />
              <p>{formState.errors.cep ? formState.errors.cep.message : " "}</p>
            </div>
          </div>
          <h2>Dados do orçamento</h2>
          {
            fields.map((park, index) => {
              return (
                <div key={park.id} className={styles.park}>
                  <div>
                    <h2>Parque {index + 1}</h2>
                    <BsTrash onClick={() => remove(index)} color="#0b1a31" size={20} cursor="pointer" title="Deletar parque" />
                  </div>
                  <div>
                    <div className="inputFields">
                      <label htmlFor={`parks.${index}.name`}>Nome do Parque</label>
                      <input
                        id={`parks.${index}.name`}
                        type="text"
                        placeholder='Tarzan'
                        {...register(`parks.${index}.name`)}
                      />
                      <p>{formState.errors.parks && formState.errors.parks[index].equipment ? formState.errors.parks[index].equipment?.message : " "}</p>
                    </div>
                    <h3>Itens do Parque</h3>
                    <Item formState={formState} control={control} indexOne={index} register={register} />
                    <h3>Características do Parque</h3>
                    <div className={styles.characteristics}>
                      <div className="inputFields">
                        <label htmlFor={`parks.${index}.equipment`}>Medida do equipamento</label>
                        <input
                          id={`parks.${index}.equipment`}
                          type="text"
                          placeholder='2,20 x 1,00 metros'
                          {...register(`parks.${index}.equipment`)}
                        />
                        <p>{formState.errors.parks && formState.errors.parks[index].equipment ? formState.errors.parks[index].equipment?.message : " "}</p>
                      </div>
                      <div className="inputFields">
                        <label htmlFor={`parks.${index}.area`}>Área de circulação</label>
                        <input
                          id={`parks.${index}.area`}
                          type="text"
                          placeholder='4,80 x 3,00 metros'
                          {...register(`parks.${index}.area`)}
                        />
                        <p>{formState.errors.parks && formState.errors.parks[index].area ? formState.errors.parks[index].area?.message : " "}</p>
                      </div>
                      <div className="inputFields">
                        <label htmlFor={`parks.${index}.age`}>Idade</label>
                        <input
                          id={`parks.${index}.age`}
                          type="text"
                          placeholder='5 à 12 anos'
                          {...register(`parks.${index}.age`)}
                        />
                        <p>{formState.errors.parks && formState.errors.parks[index].age ? formState.errors.parks[index].age?.message : " "}</p>
                      </div>
                      <div className="inputFields">
                        <label htmlFor={`parks.${index}.material`}>Material</label>
                        <input
                          id={`parks.${index}.material`}
                          type="text"
                          placeholder='Madeira de lei (Itaúba)'
                          {...register(`parks.${index}.material`)}
                        />
                        <p>{formState.errors.parks && formState.errors.parks[index].material ? formState.errors.parks[index].material?.message : " "}</p>
                      </div>
                      <div className="inputFields">
                        <label htmlFor={`parks.${index}.painting`}>Pintura</label>
                        <input
                          id={`parks.${index}.painting`}
                          type="text"
                          placeholder='Madeira de lei (Itaúba)'
                          {...register(`parks.${index}.painting`)}
                        />
                        <p>{formState.errors.parks && formState.errors.parks[index].painting ? formState.errors.parks[index].painting?.message : " "}</p>
                      </div>
                      <div className="inputFields">
                        <label htmlFor={`parks.${index}.observations`}>Observações adicionais</label>
                        <input
                          id={`parks.${index}.observations`}
                          type="text"
                          placeholder='Observações extras ao parque'
                          {...register(`parks.${index}.observations`)}
                        />
                        <p>{formState.errors.parks && formState.errors.parks[index].observations ? formState.errors.parks[index].observations?.message : " "}</p>
                      </div>
                      <div className="inputFields">
                        <label htmlFor={`parks.${index}.value`}>Valor do parque {index}</label>
                        <input
                          id={`parks.${index}.value`}
                          type="text"
                          placeholder='5.000,00'
                          {...register(`parks.${index}.value`)}
                        />
                        <p>{formState.errors.parks && formState.errors.parks[index].value ? formState.errors.parks[index].value?.message : " "}</p>
                      </div>
                      <div className="inputFields">
                        <label htmlFor={`parks.${index}.valueInstall`}>Valor da instalação do Parque {index + 1}</label>
                        <input
                          id={`parks.${index}.valueInstall`}
                          type="text"
                          placeholder='350,00'
                          {...register(`parks.${index}.valueInstall`)}
                        />
                        <p>{formState.errors.parks && formState.errors.parks[index].valueInstall ? formState.errors.parks[index].valueInstall?.message : " "}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
          <div className={styles.addPark}>
            <button type="button" onClick={() => append({ name: '' })}>Adicionar parque ao orçamento</button>
          </div>
          <h2>Dados de pagamento e entrega</h2>
          <div className={styles.summary}>
            <div className="inputFields">
              <label htmlFor="deadline">Prazo</label>
              <input
                id="deadline"
                type="text"
                placeholder='18 a 30 de Janeiro'
                {...register("deadline")}
              />
              <p>{formState.errors.user ? formState.errors.user.message : " "}</p>
            </div>
            <div className="inputFields">
              <label htmlFor="payment">Parcelas do Pagamento</label>
              <select
                id="payment"
                {...register("payment")}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <p>{formState.errors.cep ? formState.errors.cep.message : " "}</p>
            </div>
          </div>
          <div className={styles.finish}>
            <button type="submit">Finalizar orçamento</button>
          </div>
        </form>
      }
    </div>
  )
}

export default Home
