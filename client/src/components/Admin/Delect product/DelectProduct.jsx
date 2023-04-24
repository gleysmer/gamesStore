import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DataTable from 'react-data-table-component'
import "./DelectProduct.css"


export default function DeleteProduct() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  const columnas = [
    {
        name: 'ID',
        selector: 'id',
        sortable: true,
    },
    {
        name: 'Name',
        selector: 'name',
        sortable: false
    },
    {
      name: 'Acciones',
      cell: row => <button onClick={() => handleDelete(row.id)}>Eliminar</button>
    }
]

  const handleDelete = (productId) => {
    axios
      .delete(`http://localhost:3001/products/${productId}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== productId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  
  return (
    <div>
      <div>
        <h1 className="TITULO-DELETE">Eliminar Productos</h1>
      </div>
<div className="contenedor-tabla">
      <DataTable
        columns={columnas}
        data={products}
        fixedHeaderScrollHeight='550px'
        fixedHeader='300px'
        expandableRows
        className="dataTable"
        pagination
        
      />
      </div>
    </div>
  );
}