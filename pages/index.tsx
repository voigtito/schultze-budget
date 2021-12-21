import type { NextPage } from 'next'
import { ReactElement, useState } from 'react'
import styles from '../styles/Home.module.css'
import { SubmitHandler, useForm, useFieldArray, useFormContext, FormProvider, Control, UseFormRegister } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface Items {
  name: string;
};

interface Test {
  items: Items[];
  equipment: string;
  area: string;
  age: string;
  material: string;
  value: number;
  valueInstalll: number;

}

interface ParkValue {
  parks: Test[]
};

const Home: NextPage = () => {

  const [budgetType, setBudgetType] = useState<null | string>(null);

  const createProjectFormSchema = yup.object().shape({
    equipment: yup.string().required("Medida do equipamento obrigatória"),
    area: yup.string().required("Área de circulação obrigatória"),
    age: yup.string().required("Idade obrigatória"),
    material: yup.string().required("Material obrigatório"),
    value: yup.string().required("Valor dos items obrigatório"),
    valueInstalll: yup.string().required("Valor de instalação obrigatório"),
    items: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Nome do item obrigatório"),
      })
    )
  })

  const { control, handleSubmit, register } = useForm<ParkValue>({
    resolver: yupResolver(createProjectFormSchema)
  })

  const { fields, remove, append } = useFieldArray<ParkValue>({ name: "parks", control })

  async function handleCreateBudget() {

  }

  return (
    <div className={styles.container}>
      <h1>Preencha os dados de seu orçamento!</h1>
      <section>
        <h2>Selecione o tipo de orçamento</h2>
        <button onClick={() => setBudgetType("Parque")}>Parque</button>
      </section>
      {
        budgetType === "Parque"
        &&
        <form onSubmit={handleSubmit(handleCreateBudget)}>
          <h2>Orçamento</h2>
          <label htmlFor="">Total de itens do pedido</label>
          <input type="text" placeholder='2 parques' />
          <label htmlFor="">Cliente</label>
          <input type="text" placeholder='Nome da empresa ou cliente' />
          <label htmlFor="">CEP do cliente</label>
          <input type="number" />
          <h2>Dados do orçamento</h2>
          {
            fields.map((park, index) => {

              return (
                <div key={park.id}>
                  <Item control={control} indexOne={index} register={register} />
                  <button onClick={() => remove(index )}>Remover parque do orçamento</button>
                </div>
              )
            })
          }
          <button onClick={() => append({ name: '' })}>Adicionar parque ao orçamento</button>
        </form>
      }
    </div>
  )
}

interface Teste {
  indexOne: number;
  control: Control<ParkValue, object>;
  register: UseFormRegister<ParkValue>;
}

export const Item = ({ control, indexOne, register }: Teste) => {

  const { fields, remove, append } = useFieldArray({ name: `parks.${indexOne}.items`, control })

  return (
    <>
      {
        fields.map((field, index) => {
          return (
            <div key={index}>
              <label htmlFor={`parks.${indexOne}.items.${index}.name`}>Item {index}</label>
              <input type="text" {...register(`parks.${indexOne}.items.${index}.name`)} />
              <button onClick={() => remove(index)}>Remover item do orçamento</button>
            </div>
          )
        })
      }
      <button onClick={() => append({ name: '' })}>Adicionar item ao orçamento</button>
    </>
  )
}

export default Home
