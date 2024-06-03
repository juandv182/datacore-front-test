import React, { useState, useEffect } from 'react';
import { getAllCPU } from '../api/RecursoDropdown';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const CPUDropdown = ({ value, onChange }) => {
    const [cpuList, setCpuList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const res = await getAllCPU();
            // Filtrar la lista de CPUs para mostrar solo las que tienen estado=1
            const filteredCPUs = res.data.filter(cpu => cpu.estado === 1);
            setCpuList(filteredCPUs);
        } catch (error) {
            console.error("Error al cargar CPUs:", error);
        }
        };
    
        fetchData();
    }, []);

    return (
        <FormControl required sx={{ minWidth: 120 }}>
        <InputLabel id="cpu-dropdown-label">CPU</InputLabel>
        <Select
            labelId="cpu-dropdown-label"
            id="cpu-dropdown"
            value={value}
            onChange={onChange}
            label="CPUs Disponibles"
        >
            {cpuList.map(cpuItem => (
            <MenuItem key={cpuItem.id} value={cpuItem}>{cpuItem.nombre}</MenuItem>
            ))}
        </Select>
        </FormControl>
    );
};

export default CPUDropdown;
