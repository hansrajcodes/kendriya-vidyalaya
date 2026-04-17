'use client'

import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import styles from './data-table.module.css'

export default function DataTable({
  title,
  columns,
  rows,
  onAdd,
  onEdit,
  onDelete,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <span className={styles.title}>{title}</span>
        <button className={styles.addBtn} onClick={onAdd}>
          <FiPlus /> Add New
        </button>
      </div>

      <div className={styles.overflow}>
        {rows.length === 0 ? (
          <div className={styles.empty}>No records found. Click "Add New" to create one.</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.editBtn} onClick={() => onEdit(row)}>
                        <FiEdit2 />
                      </button>
                      <button className={styles.deleteBtn} onClick={() => onDelete(row.id)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
