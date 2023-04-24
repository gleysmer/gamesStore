import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DataTable from 'react-data-table-component'
import { Link } from "react-router-dom";


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
        cell: row => <Link to={`/admin-modif-product/${row.id}`}>upDate</Link>
    }
]

const handleUpdate = (productId) => {
    // redirigir al usuario a la ruta correspondiente al componente `ModifProduct`
    return <Link to={`/admin-modif-product/${productId}`} />
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
        <h1 className="TITULO-DELETE">Get Product </h1>
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