import { createContext, useRef, useState } from "react";
import { deleteExpense, getExpenses, postExpense, putExpense } from "../apis/expenses";
import { deleteIncome, getIncomes, postIncome, putIncome } from "../apis/incomes";
import { deleteAccount, getAccounts, postAccount, putAccount } from "../apis/accounts";
import { deleteTransaction, getTransactions, postTransaction, putTransaction } from "../apis/transactions";

const DataContext = createContext();

const DataContextProvider = (props) => {

	const [token, setToken] = useState(localStorage.getItem('accessToken'));
	const [page, setPage] = useState('trans') // 'trans' / 'acc' / 'cat'
	const [expenses, setExpenses] = useState([]);
	const [incomes, setIncomes] = useState([]);
	const [accounts, setAccounts] = useState([]);
	const [transactions, setTransactions] = useState([]);
	const [modal, setModal] = useState(false);
	const [modalType, setModalType] = useState(''); // 'category' / 'accounts' / 'transactions'
	const [modalAdd, setModalAdd] = useState(true);
	const [modalForm, setModalForm] = useState('minus'); // 'plus' / 'minus' / 'empty'
	const [modalInput, setModalInput] = useState({

		expense_id: '',
		expense_name: '',

		income_id: '',
		income_name: '',

		account_id: '',
		account_name: '',

		transaction_id: '',
		transaction_time: '',
		id_account: '',
		id_income: '',
		id_expense: '',
		id_transfer: '',
		transaction_amount: '',
		transaction_note: '',
		transaction_bill: '',
		transaction_image: ''
	});
	const inputFile = useRef(null);
	const [load, setLoad] = useState(false);

	return (
		<DataContext.Provider
			value={{
				token,
				setToken,
				page,
				setPage,
				expenses,
				setExpenses,
				incomes,
				setIncomes,
				accounts,
				setAccounts,
				transactions,
				setTransactions,
				modal,
				setModal,
				modalType,
				setModalType,
				modalAdd,
				setModalAdd,
				modalForm,
				setModalForm,
				modalInput,
				setModalInput,
				inputFile,
				load,
				setLoad,
				deleteExpense,
				getExpenses,
				postExpense,
				putExpense,
				deleteIncome,
				getIncomes,
				postIncome,
				putIncome,
				deleteAccount,
				getAccounts,
				postAccount,
				putAccount,
				deleteTransaction,
				getTransactions,
				postTransaction,
				putTransaction
			}}
		>
			{props.children}
		</DataContext.Provider>
	);
};

export { DataContext, DataContextProvider };