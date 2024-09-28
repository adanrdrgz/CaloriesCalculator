import { ChangeEvent, Dispatch, FormEvent, useState } from "react"
import {v4 as uuidV4} from 'uuid'  
import { categories } from "../data/categories"
import { Activity } from "../types"
import { ActivityActions } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>
}

const Form = ({dispatch} : FormProps) => {
    
    const initialState : Activity = {
        id: uuidV4(),
        category: 1,
        name: '',
        calories: 0
    }
    const [activity, setActivity] = useState<Activity>(initialState) 

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        
        setActivity({
            ...activity,
            [e.target.id] : isNumberField ? +e.target.value : e.target.value 
        })
    }

    const isValidActivity = () => {
        const {name, calories} = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({type: 'save-activity', payload: {newActivity: activity}})
        setActivity({
            ...initialState,
            id: uuidV4()
        })
    }

  return (
    <form action="" className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Category</label>
            <select name="" id="category" className="border border-slate-300 p-2 rounded-lg w-full bg-white">
                {categories.map( category => (
                    <option 
                        value={activity.category}
                        key={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Activity:</label>
            <input 
                type="text" 
                id="name"
                className="border border-slate-300 p-2 rounded-lg" 
                placeholder="Ex. Food, Orange Juice, Salad, Bike"
                value={activity.name}
                onChange={handleChange}
            />
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calories:</label>
            <input 
                type="text" 
                id="calories"
                className="border border-slate-300 p-2 rounded-lg" 
                placeholder="Calories. Ex. 300, 100"
                value={activity.calories}
                onChange={handleChange}
            />
        </div>

        <input 
            type="submit" 
            className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
            value={ activity.category === 1 ? 'Save Food' : 'Save Exercise'}
            disabled={!isValidActivity()}
        />
    </form>
  )
}

export default Form