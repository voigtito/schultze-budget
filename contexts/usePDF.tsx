import { createContext, ReactNode, useContext } from 'react';
import { ParkValue } from '../interfaces';

type PDFData = {
  getCurrentPDF(): Promise<ParkValue>;
  setCurrentPDF(data: ParkValue): void;
};

type PDFProviderProps = {
  children: ReactNode
}

export const PDFContext = createContext({} as PDFData);

export function PDFProvider({ children }: PDFProviderProps) {

  function FormatPrice(str: any) {
    str = str.replace(/\./g,'')
    str = str.replace(/,/g, '.')
    return Number(str);
  }

  async function getCurrentPDF() {
    let pdf = await localStorage.getItem('@currentPDF');

    if (pdf) {
      return JSON.parse(pdf);
    } else {
      return false;
    }
  }

  async function setCurrentPDF(data: ParkValue) {
    let total = 0
    for (const park of data.parks) {
      total = total + FormatPrice(park.value) + FormatPrice(park.valueInstall);
    }
    data.totalValue = total;
    await localStorage.setItem('@currentPDF', JSON.stringify(data));
  }

  return (
    <PDFContext.Provider value={{ getCurrentPDF, setCurrentPDF }}>
      {children}
    </PDFContext.Provider>
  )
}

export function usePDF(): PDFData {
  const context = useContext(PDFContext);

  if (!context) {
    throw new Error('usePDF must be used within an PDFProvider')
  }

  return context;
}