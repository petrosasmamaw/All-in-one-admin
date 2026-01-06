import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllClients,
  updateClient,
  deleteClient,
} from "../Slice/clientSlice";

const Clients = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients.clients || []);
  const status = useSelector((state) => state.clients.status);

  useEffect(() => {
	dispatch(fetchAllClients());
  }, [dispatch]);

  const toggleStatus = (c) => {
	const newStatus = c.status === "active" ? "inactive" : "active";
	dispatch(
	  updateClient({
		id: c._id,
		clientData: {
		  name: c.name,
		  userId: c.userId,
		  phoneNo: c.phoneNo,
		  status: newStatus,
		},
	  })
	);
  };

  const handleDelete = (id) => {
	if (window.confirm("Are you sure you want to delete this client?")) {
	  dispatch(deleteClient(id));
	}
  };

  return (
	<div className="container">
	  <div className="clients-card">
		<div className="page-header-row">
			<div className="page-icon" aria-hidden>📇</div>
			<div>
				<h3>Clients</h3>
				<p className="muted">Manage registered clients and their status.</p>
			</div>
		</div>
		<h2>Clients</h2>

		{status === "loading" && <div className="nav-loading">Loading...</div>}

		<div className="table-wrap">
					<table className="clients-table">
						<thead>
							<tr>
								<th>Avatar</th>
								<th>Name</th>
								<th>Phone</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
			  {clients.length === 0 && (
				<tr>
				  <td colSpan="4" style={{ textAlign: "center" }}>
					No clients found
				  </td>
				</tr>
			  )}

							{clients.map((c) => (
								<tr key={c._id}>
									<td>
										{c.image ? (
											<img src={c.image} alt={c.name} className="client-avatar" />
										) : (
											<div className="client-avatar placeholder">
												{c.name ? c.name.charAt(0).toUpperCase() : "?"}
											</div>
										)}
									</td>
									<td>{c.name}</td>
									<td>{c.phoneNo}</td>
									<td>
										<button
											className={
												"status-btn " + (c.status === "active" ? "active" : "inactive")
											}
											onClick={() => toggleStatus(c)}
										>
											{c.status}
										</button>
									</td>
									<td>
										<button className="delete-btn" onClick={() => handleDelete(c._id)}>
											Delete
										</button>
									</td>
								</tr>
							))}
			</tbody>
		  </table>
		</div>
	  </div>
	</div>
  );
};

export default Clients;
