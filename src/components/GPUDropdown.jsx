import React, { useState, useEffect } from 'react';
import { getAllGPU } from '../api/RecursoDropdown';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const GPUDropdown = ({ value, onChange }) => {
    const [gpuList, setGpuList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const res = await getAllGPU();
            // Filtrar la lista de GPUs para mostrar solo las que tienen estado=1
            const filteredGPUs = res.data.filter(gpu => gpu.estado === 1);
            setGpuList(filteredGPUs);
        } catch (error) {
            console.error("Error al cargar GPUs:", error);
        }
        };
    
        fetchData();
    }, []);

    return (
        <FormControl required sx={{ minWidth: 120 }}>
        <InputLabel id="gpu-dropdown-label">GPU</InputLabel>
        <Select
            labelId="gpu-dropdown-label"
            id="gpu-dropdown"
            value={value}
            onChange={onChange}
            label="GPUs Disponibles"
        >
            {gpuList.map(gpuItem => (
            <MenuItem key={gpuItem.id} value={gpuItem}>{gpuItem.nombre}</MenuItem>
            ))}
        </Select>
        </FormControl>
    );
};

export default GPUDropdown;
