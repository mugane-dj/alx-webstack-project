import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Project, ProjectsContextType } from "../interfaces/IProject";
import { log } from "console";

export const AllProjectsContext = React.createContext<ProjectsContextType | undefined>(undefined);


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
    const createAProject = async (title: string, description: string, image: string, businessShortCode: string, goalAmount: string, userId: string) => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('image', image);
            formData.append('businessShortCode', businessShortCode);
            formData.append('goalAmount', goalAmount);
            formData.append('userId', userId);

            console.log(formData, 'mygkjh')

            const response = await fetch(`/api/v1/projects?userId=${userId}`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setProjects([...projects, data]);
            } else {
                console.error('Error creating a project:', response.status, response.statusText, response);
            }
        } catch (error) {
            console.error('Error creating a project', error);
        }
    }

    return (
        <AllProjectsContext.Provider value={{ projects, createAProject }}>
            {children}
        </AllProjectsContext.Provider>
    )

}

export function useProjectsContext() {
    const pContext = useContext(AllProjectsContext);
    if (!pContext) {
        throw new Error("context must be used within a provider");
    }
    return pContext;
}




// export const AllProjectsContext = createContext<AllProjectsInterface>(defProjectsContext)