import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllClients } from '../Slice/clientSlice'
import { fetchAllItems } from '../Slice/itemSlice'
import { fetchAllSellers } from '../Slice/sellersSlice'
import { Bar, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const Dashboard = () => {
	const dispatch = useDispatch()

	const clientsState = useSelector((s) => s.clients)
	const itemsState = useSelector((s) => s.items)
	const sellersState = useSelector((s) => s.sellers)

	useEffect(() => {
		if (clientsState.status === 'idle') dispatch(fetchAllClients())
		if (itemsState.status === 'idle') dispatch(fetchAllItems())
		if (sellersState.status === 'idle') dispatch(fetchAllSellers())
	}, [dispatch, clientsState.status, itemsState.status, sellersState.status])

	const clientsCount = clientsState.clients ? clientsState.clients.length : 0
	const itemsCount = itemsState.items ? itemsState.items.length : 0
	const sellersCount = sellersState.sellers ? sellersState.sellers.length : 0

	const loading = [clientsState.status, itemsState.status, sellersState.status].includes('loading')

	const barData = {
		labels: ['Clients', 'Items', 'Sellers'],
		datasets: [
			{
				label: 'Count',
				data: [clientsCount, itemsCount, sellersCount],
				backgroundColor: [
					'rgba(75, 192, 192, 0.6)',
					'rgba(54, 162, 235, 0.6)',
					'rgba(255, 206, 86, 0.6)',
				],
				borderColor: [
					'rgba(75, 192, 192, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
				],
				borderWidth: 1,
			},
		],
	}

	const barOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Platform Overview',
			},
		},
	}

	const pieData = {
		labels: ['Clients', 'Items', 'Sellers'],
		datasets: [
			{
				data: [clientsCount, itemsCount, sellersCount],
				backgroundColor: [
					'rgba(255, 99, 132, 0.6)',
					'rgba(54, 162, 235, 0.6)',
					'rgba(255, 206, 86, 0.6)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
				],
				borderWidth: 1,
			},
		],
	}

	const pieOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: 'bottom',
			},
			title: {
				display: true,
				text: 'Distribution',
			},
		},
	}

	return (
		<div className="dashboard">
			<div className="page-header-row">
				<div className="page-icon" aria-hidden>📊</div>
				<div>
					<h3>Dashboard</h3>
					<p className="muted">Comprehensive overview of platform activity and insights.</p>
				</div>
			</div>

			<div className="dashboard-intro">
				<h2>Welcome to the Admin Dashboard</h2>
				<p>Monitor key metrics, visualize data, and manage your platform efficiently.</p>
			</div>

			<div className="stats-grid">
				<div className="stat-card">
					<div className="stat-icon">👥</div>
					<div className="stat-content">
						<h4>Clients</h4>
						<div className="stat-value">{loading ? '...' : clientsCount}</div>
						<p>Total registered clients</p>
					</div>
				</div>

				<div className="stat-card">
					<div className="stat-icon">🛒</div>
					<div className="stat-content">
						<h4>Items</h4>
						<div className="stat-value">{loading ? '...' : itemsCount}</div>
						<p>Active items for sale</p>
					</div>
				</div>

				<div className="stat-card">
					<div className="stat-icon">🏪</div>
					<div className="stat-content">
						<h4>Sellers</h4>
						<div className="stat-value">{loading ? '...' : sellersCount}</div>
						<p>Registered seller accounts</p>
					</div>
				</div>
			</div>

			<div className="charts-section">
				<div className="chart-container">
					<h3>Data Visualization</h3>
					<div className="chart-wrapper">
						<div className="chart-item">
							<Bar data={barData} options={barOptions} />
						</div>
						<div className="chart-item">
							<Pie data={pieData} options={pieOptions} />
						</div>
					</div>
				</div>
			</div>

			<div className="quick-actions">
				<h3>Quick Actions</h3>
				<div className="actions-grid">
					<Link to="/clients" className="action-card">
						<div className="action-icon">🔍</div>
						<div className="action-content">
							<h4>Manage Clients</h4>
							<p>View and manage client accounts</p>
						</div>
					</Link>
					<Link to="/sellers" className="action-card">
						<div className="action-icon">👨‍💼</div>
						<div className="action-content">
							<h4>Manage Sellers</h4>
							<p>Oversee seller registrations</p>
						</div>
					</Link>
					<Link to="/dashboard" className="action-card">
						<div className="action-icon">📈</div>
						<div className="action-content">
							<h4>View Analytics</h4>
							<p>Detailed platform analytics</p>
						</div>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Dashboard

