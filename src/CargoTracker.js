import React, { useState } from 'react';

const CargoTracker = () => {
    const [cargoList, setCargoList] = useState([
        {
            id: "CARGO001",
            name: "Строительные материалы",
            status: "В пути",
            origin: "Москва",
            destination: "Казань",
            departureDate: "2024-11-24"
        },
        {
            id: "CARGO002",
            name: "Хрупкий груз",
            status: "Ожидает отправки",
            origin: "Санкт-Петербург",
            destination: "Екатеринбург",
            departureDate: "2024-11-26"
        }

    ]);
    const [cargoId, setCargoId] = useState(`CARGO${String(cargoList.length + 1).padStart(3, '0')}`);
    const [cargoName, setCargoName] = useState('');
    const [cargoStatus, setCargoStatus] = useState('Ожидает отправки');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [filter, setFilter] = useState('');

    const handleAddCargo = (e) => {
        e.preventDefault();
        if (!cargoId || !cargoName || !cargoStatus || !origin || !destination || !departureDate) {
            alert('Пожалуйста, заполните все поля!');
            return;
        }

        const newCargo = {
            id: cargoId,
            name: cargoName,
            status: cargoStatus,
            origin,
            destination,
            departureDate,
        };

        setCargoList([...cargoList, newCargo]);
        clearForm();
    };

    const clearForm = () => {
        setCargoId(`CARGO${String(cargoList.length + 2).padStart(3, '0')}`);
        setCargoName('');
        setCargoStatus('Ожидает отправки');
        setOrigin('');
        setDestination('');
        setDepartureDate('');
    };

    const handleStatusChange = (cargoId, newStatus) => {
        const cargo = cargoList.find(cargo => cargo.id === cargoId);

        if (!cargo) {
            alert('Ошибка: груз не найден!');
            return;
        }

        if (newStatus === 'Доставлен' && new Date(cargo.departureDate) > new Date()) {
            alert('Ошибка: дата отправления находится в будущем!');
            return;
        }

        const index = cargoList.findIndex(c => c.id === cargoId);

        const updatedCargoList = [...cargoList];
        updatedCargoList[index] = { ...cargo, status: newStatus };

        setCargoList(updatedCargoList);
    };

    const filteredCargoList = cargoList.filter(cargo => (filter === '' || cargo.status === filter));

    return (
        <div className="container-fluid mt-5">
            <h1 className={'text-center mb-5'}>Отслеживание грузов</h1>
            <form onSubmit={handleAddCargo} className="mb-4">
                <div className="row">
                    <div className="col">
                        <input className="form-control" type="text" placeholder="Название груза" value={cargoName} onChange={(e) => setCargoName(e.target.value)} required />
                    </div>
                    <div className="col">
                        <select className="form-control" value={cargoStatus} onChange={(e) => setCargoStatus(e.target.value)} required>
                            <option value="" disabled>Выберите статус</option>
                            <option value="Ожидает отправки">Ожидает отправки</option>
                            <option value="В пути">В пути</option>
                            <option value="Доставлен">Доставлен</option>
                        </select>
                    </div>
                    <div className="col">
                        <input className="form-control" type="text" placeholder="Пункт отправления" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
                    </div>
                    <div className="col">
                        <input className="form-control" type="text" placeholder="Пункт назначения" value={destination} onChange={(e) => setDestination(e.target.value)} required />
                    </div>
                    <div className="col">
                        <input className="form-control" type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Добавить груз</button>
                </div>
            </form>

            <div className="mb-4">
                <h5>Фильтр по статусу:</h5>
                <select className="form-control" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="">Все</option>
                    <option value="Ожидает отправки">Ожидает отправки</option>
                    <option value="В пути">В пути</option>
                    <option value="Доставлен">Доставлен</option>
                </select>
            </div>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Номер груза</th>
                    <th>Название груза</th>
                    <th>Статус груза</th>
                    <th>Пункт отправления</th>
                    <th>Пункт назначения</th>
                    <th>Дата отправления</th>
                    <th>Изменить статус</th>
                </tr>
                </thead>
                <tbody>
                {filteredCargoList.map((cargo) => (
                    <tr key={cargo.id} className={getStatusClass(cargo.status)}>
                        <td>{cargo.id}</td>
                        <td>{cargo.name}</td>
                        <td>{cargo.status}</td>
                        <td>{cargo.origin}</td>
                        <td>{cargo.destination}</td>
                        <td>{cargo.departureDate}</td>
                        <td>
                            <select
                                className="form-control"
                                onChange={(e) => handleStatusChange(cargo.id, e.target.value)}
                                defaultValue=""
                            >
                                <option value="" disabled>Изменить статус</option>
                                <option value="Ожидает отправки">Ожидает отправки</option>
                                <option value="В пути">В пути</option>
                                <option value="Доставлен">Доставлен</option>
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

const getStatusClass = (status) => {
    switch (status) {
        case 'Ожидает отправки':
            return 'table-warning';
        case 'В пути':
            return 'table-info';
        case 'Доставлен':
            return 'table-success';
        default:
            return '';
    }
};

export default CargoTracker;