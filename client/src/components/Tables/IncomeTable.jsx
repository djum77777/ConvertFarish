import { useContext, useEffect } from 'react';
import { DataContext } from '../../context/DataContext';
import './IncomeTable.css';
import { GlobalContext } from '../../context/GlobalContext';
import { message } from 'antd';

const IncomeTable = () => {
	const { setLoad } = useContext(GlobalContext);
	const {
		token,
		incomes,
		setIncomes,
		setModal,
		setModalAdd,
		setModalForm,
		modalInput,
		setModalInput,
		getIncomes,
		deleteIncome
	} = useContext(DataContext);

	useEffect(() => {
		const getData = async () => {
			const data = await getIncomes(token);
			setIncomes(data);
		};
		getData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	const handleEditModal = (id, name) => {
		setModal(true);
		setModalAdd(false);
		setModalForm('plus');
		setModalInput({...modalInput, income_id: id, income_name: name});
	};

	const handleDelete = async (id) => {
		setLoad(true);
		const res = await deleteIncome(id, token);
		if (res.response) {
			message.error(res.response.data.message);
			setLoad(false);
		} else {
			const data = await getIncomes(token);
			message.success('Income category successfully deleted!')
			setIncomes(data);
			setLoad(false);
			setModal(false);
		};
	};

	const Render = ({ data }) => {
		return (
			<div className="id">
				<div className="name">{data.income_name}</div>
				<button className="edit" onClick={() => handleEditModal(
					data.income_id,
					data.income_name
				)}>Edit</button>
				<button className="delete" onClick={() => handleDelete(data.income_id)}>Delete</button>
			</div>
		);
	};

	return (
		<div className="card">
			<span>Income Category</span>
			<div className="data">
				{incomes ? incomes.map(item => <Render data={item} key={item.income_id} />) : <div className='no-data'>No Data</div>}
			</div>
		</div>
	);
};

export default IncomeTable;