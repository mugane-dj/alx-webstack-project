import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Project } from "../interfaces/IProject";

export const AllProjectsContext = React.createContext<Project[] | undefined>(undefined);


export const ProjectsProvider = ({ children }: { children: React.ReactNode }) => {
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        async function getProjects() {
            try {
                const response = await fetch('/api/v1/projects', {
                    method: 'GET'
                });
                const data = await response.json();
                setProjects(data as Project[]);
                console.log(data, 'allProjects')
            } catch (error) {
                console.log('error fetching projects', error);
            }
        }
        getProjects();
    }, [])

    return (
        <AllProjectsContext.Provider value={projects}>
            {children}
        </AllProjectsContext.Provider>
    )

}

export function useGetProjectsContext() {
    const pContext = useContext(AllProjectsContext);
    if (!pContext) {
        throw new Error("context must be used within a provider");
    }
    return pContext;
}




// export const AllProjectsContext = createContext<AllProjectsInterface>(defProjectsContext)