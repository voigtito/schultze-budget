import { Control, FormState, useFieldArray, UseFormRegister } from "react-hook-form";
import { ParkValue } from "../../interfaces";
import { IoCloseCircleOutline } from 'react-icons/io5'

interface ItemInterface {
  indexOne: number;
  control: Control<ParkValue, object>;
  register: UseFormRegister<ParkValue>;
  formState: FormState<ParkValue>
}

const Item = ({ control, indexOne, register, formState }: ItemInterface) => {

  const { fields, remove, append } = useFieldArray({ name: `parks.${indexOne}.items`, control })

  return (
    <>
      {
        fields.map((field, index) => {
          return (
            <div key={index} >
              <div className="inputFields">
                <label htmlFor={`parks.${indexOne}.items.${index}.name`}>Item {index}</label>
                <div>
                  <input
                    id={`parks.${indexOne}.items.${index}.name`}
                    type="text"
                    placeholder="Nome do item do parque"
                    {...register(`parks.${indexOne}.items.${index}.name`)}
                  />
                  <IoCloseCircleOutline size={26} cursor="pointer" onClick={() => remove(index)} title="Deletar item"/>
                </div>
              </div>
            </div>
          )
        })
      }
      <button className="addItem" type="button" onClick={() => append({ name: '' })}>Adicionar item do parque</button>
    </>
  )
}

export default Item;