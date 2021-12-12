import { useTable } from 'react-table'

export default function Table({ columns = [], data = [] }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    return (
        <table {...getTableProps()} className='w-full divide-y divide-gray-200 border-collapse'>
            <thead className='bg-gray-50'>
                {headerGroups.map((headerGroup, headerIndex) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerIndex}>
                    {headerGroup.headers.map((column, columnIndex) => (
                    <th {...column.getHeaderProps()} key={columnIndex} className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>{column.render('Header')}</th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()} className='bg-white divide-y divide-gray-200'>
                {
                    rows.map((row, rowIndex) => {
                        prepareRow(row)
                    
                        return (
                            <tr {...row.getRowProps()} key={rowIndex}>
                                {row.cells.map((cell, cellIndex) => {
                                    return <td {...cell.getCellProps()} key={cellIndex} className='px-6 py-4 whitespace-nowrap'>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}