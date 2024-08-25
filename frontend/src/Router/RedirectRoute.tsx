import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const RedirectRoute = (props: any) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(props?.path);
    });

    return null;
};