import React from "react";
import { FaUsers, FaStore, FaBoxOpen, FaChartBar, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function AdminFooter() {
  return (
    <footer className="admin-footer">
      <div className="footer-container">

        {/* Dashboard Info */}
        <div className="footer-section">
          <h3>Admin Dashboard</h3>
          <p>
            This admin dashboard provides full control and real-time insights
            into sellers, clients, and items. It helps administrators monitor
            platform activity, manage users, and visualize data efficiently.
          </p>

          <div className="footer-features">
            <span><FaUsers /> Clients</span>
            <span><FaStore /> Sellers</span>
            <span><FaBoxOpen /> Items</span>
            <span><FaChartBar /> Analytics</span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact Admin</h3>

          <ul className="contact-list">
            <li>
              <FaEnvelope />
              <span>admin@dashboard.com</span>
            </li>
            <li>
              <FaPhone />
              <span>+251 989 886 956</span>
            </li>
            <li>
              <FaMapMarkerAlt />
              <span>Bahir Dar, Ethiopia</span>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Admin Dashboard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
