import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllClients } from '../Slice/clientSlice'
import { fetchAllItems } from '../Slice/itemSlice'
import { fetchAllSellers } from '../Slice/sellersSlice'

const SmallBarChart = ({ data }) => {
	const labels = Object.keys(data)
	const values = Object.values(data)
	const max = Math.max(...values, 1)
	const width = 400
	const height = 180
	const barWidth = Math.floor(width / labels.length) - 20

	return (
		<svg width={width} height={height}>
			{values.map((v, i) => {
				const barHeight = Math.round((v / max) * (height - 40))
				const x = i * (barWidth + 20) + 20
				const y = height - barHeight - 20
				return (
					<g key={labels[i]}>
						<rect x={x} y={y} width={barWidth} height={barHeight} fill="#4f46e5" rx={4} />
						<text x={x + barWidth / 2} y={height - 6} fontSize={12} textAnchor="middle">{labels[i]}</text>
						<text x={x + barWidth / 2} y={y - 6} fontSize={12} textAnchor="middle">{v}</text>
					</g>
				)
			})}
		</svg>
	)
}

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

	return (
		<div className="dashboard">
			<div className="page-header-row">
				<div className="page-icon" aria-hidden>📊</div>
				<div>
					<h3>Dashboard</h3>
					<p className="muted">Overview of platform activity and quick controls.</p>
				</div>
			</div>
			<h2>Dashboard</h2>
			<p className="dashboard-intro">Welcome back — here's a quick overview of system activity and totals for clients, items, and registered sellers. </p>

			<div className="stats-row">
				<div className="stat-card">
					<div className="label"><span className="stat-icon">📇</span>Clients</div>
					<div className="value">{loading ? '...' : clientsCount}</div>
					<div className="stat-desc">Total registered clients in the system</div>
				</div>

				<div className="stat-card">
					<div className="label"><span className="stat-icon">🛍️</span>Items</div>
					<div className="value">{loading ? '...' : itemsCount}</div>
					<div className="stat-desc">Active items available for purchase</div>
				</div>

				<div className="stat-card">
					<div className="label"><span className="stat-icon">🏬</span>Sellers</div>
					<div className="value">{loading ? '...' : sellersCount}</div>
					<div className="stat-desc">Registered seller accounts</div>
				</div>
			</div>

			<div className="overview">
				<h3>Overview</h3>
				<p className="overview-desc">The chart below visualizes the current counts. Use this as a quick health-check of the catalog and user base.</p>
				<div className="chart-wrap">
					<SmallBarChart data={{ Clients: clientsCount, Items: itemsCount, Sellers: sellersCount }} />
				</div>
			</div>

			<div className="quick-links">
				<h3>Quick Links</h3>
				<ul>
					<li><Link to="/clients">🔎 Manage Clients</Link></li>
					<li><Link to="/sellers">🧑‍💼 Manage Sellers</Link></li>
					<li><Link to="/dashboard">🏷️ All Shops</Link></li>
				</ul>
			</div>
		</div>
	)
}

export default Dashboard

