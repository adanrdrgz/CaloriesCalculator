import { ChangeEvent, useState } from "react"
import { categories } from "../data/categories"
import { Activity } from "../types"

const Form = () => {

    const [activity, setActivity] = useState<Activity>({
        category: 1,
        name: '',
        calories: 0
    }) 

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

  return (
    <form action="" className="space-y-5 bg-white shadow p-10 rounded-lg">
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
            type="text" 
            className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer"
            value={'Save'}
            disabled={isValidActivity()}
        />
    </form>
  )
}

export default Form