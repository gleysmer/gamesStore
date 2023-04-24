import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DataTable from 'react-data-table-component'
import { Link } from "react-router-dom";

export default function DeleteProduct() {
  const [products, setProducts] = useState([]);
  const [productOrders, setProductOrders] = useState([]);
  const { id } = useParams();

  // const handleSendOrder = async (orderId) => {
  //   try {
  //     await axios.put(`http://localhost:3001/sendOrder/${orderId}`);
  //     // Actualizar el estado de la orden en la tabla
  //     setProductOrders(prevOrders =>
  //       prevOrders.map(order => {
  //         if (order.id === orderId) {
  //           return {
  //             ...order,
  //             orderStatus: { status: 'sent' }
  //           };
  //         } else {
  //           return order;
  //         }
  //       })
  //     );
  //   } catch (error) {
  //     console.log(error);
  // }
  // };

  const handleSendOrder = async (idOrder) => {
    
    try {
      console.log(idOrder)
      await axios.put(`http://localhost:3001/orders/sendOrder/${idOrder}`, { orderStatus: { status: 'enviado' } });
      // Actualizar el estado de la orden en la tabla
      setProductOrders(prevOrders =>
        prevOrders.map(order => {
          
          if (order.id === idOrder) {
            return {
              ...order,
              orderStatus: { status: 'enviado' }
            };
          } else {
            return order;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }

  };

  console.log("order", productOrders)
  const columns = [
    {
      name: 'Status',
      cell: row => row.orderStatus ? row.orderStatus.status : ''
    },
    {
      name: 'ID',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'Date',
      selector: 'date',
      sortable: false
    },
    {
        name: 'Total',
        selector: 'total',
        sortable: false
      },
      {
        name: 'Address',
        selector: 'address',
        sortable: false
      },
      {
        name: 'UserID',
        selector: 'userId',
        sortable: false
      },
      
    {
      name: 'Actions',
      cell: row => (
        <>
          {row.orderStatus.status === 'pending' && (
            <button onClick={() => handleSendOrder(row.id)}>Send</button>
          )}
    </>
  )
    }
  ];

  // const handleUpdate = (productId) => {
  //   return <Link to={`/admin-modif-product/${productId}`} />
  // };

  useEffect(() => {
   
    axios.get(`http://localhost:3001/orders?status=pending&productId=${id}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/orders?status=pending&page=0&size=1000`)
      .then((response) => {
        setProductOrders(response.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
      
  }, [products]);

  return (
    <div>
      <div>
        <h1 className="TITULO-DELETE">Enviar Producto</h1>
      </div>
      <div className="contenedor-tabla">
        <DataTable
          columns={columns}
          data={productOrders}
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