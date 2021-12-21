import type { NextPage } from 'next'
import { ReactElement, useState } from 'react'
import styles from '../styles/Home.module.css'
import { SubmitHandler, useForm, useFieldArray, useFormContext, FormProvider, Control, UseFormRegister } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface Items {
  name: string;
};

interface Park {
  items: Items[];
  equipment: string;
  area: string;
  age: string;
  material: string;
  painting: string;
  value: number;
  valueInstalll: number;
  observations: string;
}

interface ParkValue {
  parks: Park[];
  totalParks: string;
  cep: string;
  user: string;
  delivery: string;
  payment: string;
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
          <label htmlFor="totalParks">Total de itens do pedido</label>
          <input id="totalParks" type="text" placeholder='2 parques' {...register("totalParks")} />
          <label htmlFor="user">Cliente</label>
          <input id="user" type="text" placeholder='Nome da empresa ou cliente' {...register("user")} />
          <label htmlFor="cep">CEP do cliente</label>
          <input id="cep" type="number" {...register("cep")} />
          <h2>Dados do orçamento</h2>
          {
            fields.map((park, index) => {
              return (
                <div key={park.id}>
                  <h2>Parque {index}</h2>
                  <h3>Itens do Orçamento</h3>
                  <Item control={control} indexOne={index} register={register} />
                  <h3>Características do Parque</h3>
                  <label htmlFor={`parks.${index}.equipment`}>Medida do equipamento</label>
                  <input
                    id={`parks.${index}.equipment`}
                    type="text"
                    placeholder='2,20 x 1,00 metros'
                    {...register(`parks.${index}.equipment`)}
                  />
                  <label htmlFor={`parks.${index}.area`}>Área de circulação</label>
                  <input
                    id={`parks.${index}.area`}
                    type="text"
                    placeholder='4,80 x 3,00 metros'
                    {...register(`parks.${index}.area`)}
                  />
                  <label htmlFor={`parks.${index}.age`}>Idade</label>
                  <input
                    id={`parks.${index}.age`}
                    type="text"
                    placeholder='5 à 12 anos'
                    {...register(`parks.${index}.age`)}
                  />
                  <label htmlFor={`parks.${index}.material`}>Material</label>
                  <input
                    id={`parks.${index}.material`}
                    type="text"
                    placeholder='Madeira de lei (Itaúba)'
                    {...register(`parks.${index}.material`)}
                  />
                  <label htmlFor={`parks.${index}.painting`}>Pintura</label>
                  <input
                    id={`parks.${index}.painting`}
                    type="text"
                    placeholder='Madeira de lei (Itaúba)'
                    {...register(`parks.${index}.painting`)}
                  />
                  <label htmlFor={`parks.${index}.observations`}>Observações adicionais</label>
                  <input
                    id={`parks.${index}.observations`}
                    type="text"
                    placeholder='Madeira de lei (Itaúba)'
                    {...register(`parks.${index}.observations`)}
                  />
                  <label htmlFor={`parks.${index}.value`}>Valor do parque {index}</label>
                  <input
                    id={`parks.${index}.value`}
                    type="text"
                    placeholder='R$ 5.000,00'
                    {...register(`parks.${index}.value`)}
                  />
                  <label htmlFor={`parks.${index}.valueInstalll`}>Valor da instalação {index}</label>
                  <input
                    id={`parks.${index}.valueInstalll`}
                    type="text"
                    placeholder='R$ 350,00'
                    {...register(`parks.${index}.valueInstalll`)}
                  />
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

interface ItemInterface {
  indexOne: number;
  control: Control<ParkValue, object>;
  register: UseFormRegister<ParkValue>;
}

export const Item = ({ control, indexOne, register }: ItemInterface) => {

  const { fields, remove, append } = useFieldArray({ name: `parks.${indexOne}.items`, control })

  return (
    <>
      {
        fields.map((field, index) => {
          return (
            <div key={index}>
              <label htmlFor={`parks.${indexOne}.items.${index}.name`}>Item {index}</label>
              <input
                id={`parks.${indexOne}.items.${index}.name`}
                type="text"
                {...register(`parks.${indexOne}.items.${index}.name`)}
              />
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
