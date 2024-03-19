import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router";
import { AuthContext } from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const { isAuth, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Routes>
            {isAuth ? (
                <>
                    {privateRoutes.map((route) => (
                        // Удаление атрибута exact, так как в v6 все маршруты являются точными по умолчанию
                        <Route
                            element={route.element}
                            path={route.path}
                            key={route.path}
                        />
                    ))}
                    {/* Для перенаправления всех остальных путей используется "*" */}
                    <Route
                        path="*"
                        element={<Navigate to="/posts" replace />}
                    />
                </>
            ) : (
                <>
                    {publicRoutes.map((route) => (
                        <Route
                            element={route.element}
                            path={route.path}
                            key={route.path}
                        />
                    ))}
                    <Route
                        path="*"
                        element={<Navigate to="/login" replace />}
                    />
                </>
            )}
        </Routes>
    );
};

export default AppRouter;
