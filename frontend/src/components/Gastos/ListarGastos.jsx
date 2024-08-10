import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerGastos, eliminarGasto, actualizarGasto } from '../../services/gastos.services';
import { obtenerCategorias } from '../../services/categoria.services';
import { obtenerTipoTransaccion } from '../../services/tipoTransaccion.services';
import { obtenerMediosPago } from '../../services/metodoPago.services';
import { obtenerDivisa } from '../../services/divisa.services';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../styles/Gastos.css';

const ListarGastos = () => {
  const [gastos, setGastos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [tiposTransaccion, setTiposTransaccion] = useState([]);
  const [metodosPago, setMetodosPago] = useState([]);
  const [divisas, setDivisas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedGasto, setSelectedGasto] = useState(null);
  const [formValues, setFormValues] = useState({
    descripcion: '',
    monto: '',
    fecha: '',
    divisa: '',
    tipotransaccion: '',
    metodopago: '',
    categoria: ''
  });

  useEffect(() => {
    cargarGastos();
    cargarOpciones();
  }, []);

  const cargarGastos = async () => {
    try {
      const gastosData = await obtenerGastos();
      setGastos(gastosData);
    } catch (error) {
      console.error('Error al cargar los gastos:', error);
    }
  };

  const cargarOpciones = async () => {
    try {
      const [categoriasData, tiposTransaccionData, metodosPagoData, divisasData] = await Promise.all([
        obtenerCategorias(),
        obtenerTipoTransaccion(),
        obtenerMediosPago(),
        obtenerDivisa()
      ]);
      setCategorias(categoriasData);
      setTiposTransaccion(tiposTransaccionData);
      setMetodosPago(metodosPagoData);
      setDivisas(divisasData);
    } catch (error) {
      console.error('Error al cargar las opciones:', error);
    }
  };

  const handleEliminarGasto = async (id) => {
    try {
      await eliminarGasto(id);
      setGastos(gastos.filter((gasto) => gasto.id !== id));
    } catch (error) {
      console.error(`Error al eliminar el gasto con ID ${id}:`, error);
    }
  };

  const handleShowModal = (type, gasto) => {
    setModalType(type);
    setSelectedGasto(gasto);
    setFormValues({
      descripcion: gasto.descripcion,
      monto: gasto.monto,
      fecha: gasto.fecha,
      divisa: gasto.divisa_id,
      tipotransaccion: gasto.tipostransaccion_id,
      metodopago: gasto.metodopago_id,
      categoria: gasto.categoria_id
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedGasto(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSaveChanges = async () => {
    try {
      if (selectedGasto) {
        const updatedGasto = {
          ...selectedGasto,
          ...formValues
        };
        await actualizarGasto(updatedGasto.id, updatedGasto);
        setGastos(gastos.map(gasto => gasto.id === updatedGasto.id ? updatedGasto : gasto));
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Listado de Gastos</h5>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {gastos.map((gasto) => (
                <tr key={gasto.id}>
                  <td>{gasto.descripcion}</td>
                  <td>${gasto.monto}</td>
                  <td>{gasto.fecha}</td>
                  <td className="align-middle">
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        title="Consultar"
                        onClick={() => handleShowModal('consultar', gasto)}
                      >
                        <i className="fa fa-eye"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        title="Modificar"
                        onClick={() => handleShowModal('editar', gasto)}
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        title="Eliminar"
                        onClick={() => handleEliminarGasto(gasto.id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 d-flex justify-content-start">
          <Link to="/inicio" className="btn btn-outline-primary me-2">
            <i className="fa fa-home me-1"></i> Volver a Inicio
          </Link>
          <Link to="/registro" className="btn btn-outline-success">
            <i className="fa fa-plus me-1"></i> Registrar Nuevo Gasto
          </Link>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === 'consultar' ? 'Consultar Gasto' : 'Editar Gasto'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-scroll">
          {selectedGasto && (
            <Form>
              <Form.Group className="mb-3" controlId="formDescripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  name="descripcion"
                  readOnly={modalType === 'consultar'}
                  value={formValues.descripcion}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMonto">
                <Form.Label>Monto</Form.Label>
                <Form.Control
                  type="number"
                  name="monto"
                  readOnly={modalType === 'consultar'}
                  value={formValues.monto}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formFecha">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  name="fecha"
                  readOnly={modalType === 'consultar'}
                  value={formValues.fecha}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDivisa">
                <Form.Label>Divisa</Form.Label>
                {modalType === 'consultar' ? (
                  <Form.Control
                    type="text"
                    value={divisas.find(divisa => divisa.id === formValues.divisa)?.descripcion || ''}
                    readOnly
                  />
                ) : (
                  <Form.Select
                    name="divisa"
                    value={formValues.divisa}
                    onChange={handleInputChange}
                  >
                    {divisas.map((divisa) => (
                      <option key={divisa.id} value={divisa.id}>
                        {divisa.descripcion}
                      </option>
                    ))}
                  </Form.Select>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formTipoTransaccion">
                <Form.Label>Tipo Transacción</Form.Label>
                {modalType === 'consultar' ? (
                  <Form.Control
                    type="text"
                    value={tiposTransaccion.find(tipo => tipo.id === formValues.tipotransaccion)?.descripcion || ''}
                    readOnly
                  />
                ) : (
                  <Form.Select
                    name="tipotransaccion"
                    value={formValues.tipotransaccion}
                    onChange={handleInputChange}
                  >
                    {tiposTransaccion.map((tipo) => (
                      <option key={tipo.id} value={tipo.id}>
                        {tipo.descripcion}
                      </option>
                    ))}
                  </Form.Select>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMetodoPago">
                <Form.Label>Método Pago</Form.Label>
                {modalType === 'consultar' ? (
                  <Form.Control
                    type="text"
                    value={metodosPago.find(metodo => metodo.id === formValues.metodopago)?.descripcion || ''}
                    readOnly
                  />
                ) : (
                  <Form.Select
                    name="metodopago"
                    value={formValues.metodopago}
                    onChange={handleInputChange}
                  >
                    {metodosPago.map((metodo) => (
                      <option key={metodo.id} value={metodo.id}>
                        {metodo.descripcion}
                      </option>
                    ))}
                  </Form.Select>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCategoria">
                <Form.Label>Categoría</Form.Label>
                {modalType === 'consultar' ? (
                  <Form.Control
                    type="text"
                    value={categorias.find(categoria => categoria.id === formValues.categoria)?.descripcion || ''}
                    readOnly
                  />
                ) : (
                  <Form.Select
                    name="categoria"
                    value={formValues.categoria}
                    onChange={handleInputChange}
                  >
                    {categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.descripcion}
                      </option>
                    ))}
                  </Form.Select>
                )}
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        {modalType === 'editar' && (
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

export default ListarGastos;
