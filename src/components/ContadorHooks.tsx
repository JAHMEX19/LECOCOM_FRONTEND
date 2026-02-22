import { useState } from 'react';

type ContadorHooksProps = {
    // Aquí podrías definir props si es necesario, por ejemplo:
    initialValue?: number;
};

export default function ContadorHooks(props: ContadorHooksProps) {
    // Destructuramos el array que devuelve useState para obtener el valor actual del contador y la función para actualizarlo
    const [contador, setContador] = useState(props.initialValue || 0);
    
    // Funciones para incrementar, decrementar y reiniciar el contador
    const incrementar =() => setContador(contador + 1)
    const decrementar =() => setContador(contador - 1)
    const reiniciar =() => setContador(0)
    
    return (
        <>
            <h2>Contador Hooks - useState: {contador}</h2>
            <nav>
                <button onClick={incrementar} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Incrementar</button>
                <button onClick={decrementar} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Decrementar</button>
                <button onClick={reiniciar} className="bg-gray-500 text-white px-4 py-2 rounded">Reiniciar</button>
            </nav>
        </>

    )

}