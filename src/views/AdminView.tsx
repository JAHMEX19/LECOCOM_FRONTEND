import { useState } from "react";
import { servicios } from "../data/servicios";
import ServiciosInput from "../components/ServiciosInput";




export default function AdminView() {
const [serviciosList, setServiciosList] = useState(servicios)

const handleAddServicio = (e :React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
}

  return (
    <>
      <div className="max-w-2xl mx-auto">
      
        {serviciosList.map((item) => (
          <ServiciosInput key={item.nombre}
          item={item}
          handleAddServicio={handleAddServicio}
          />
        ))}
      </div>
    </>
  );
}
