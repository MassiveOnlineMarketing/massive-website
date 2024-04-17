'use client';

import { useEffect, useState } from 'react';
import { Project } from '@prisma/client';
import { useProjectDetailsStore } from '@/lib/zustand/project-details-store';

// Utils
import { useCurrentUser } from '@/auth/hooks/use-current-user';
import { getProjectByUserId } from '@/serp/data/project';
import { cn } from '@/lib/utils';

// Components 
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Assets
import { ChevronDownIcon, CubeTransparentIcon } from '@heroicons/react/24/outline';


const ProjectSelectionButton = () => {
    const currentProject = useProjectDetailsStore(state => state);
    const setSelectedProject = useProjectDetailsStore(state => state.updateProjectDetails);
    const userId = useCurrentUser()?.id;
const [projects, setProjects] = useState<Project[] | Project | null>(null)
    const [popoverOpen, setPopoverOpen] = useState(false)

    useEffect(() => {
        fetchProjects()

    }, [currentProject])

    async function fetchProjects() {
        if (!userId) return;

        const res = await getProjectByUserId(userId)
        if (!res || res.length === 0) return;

        setProjects(res)
    }

    const handleSelectProject = (project: Project) => {
        if (currentProject.id === project.id) {
            setPopoverOpen(false)
            return
        };
        setSelectedProject(project)
        setPopoverOpen(false)
    }

    return (
        <div>
            {projects === null ? (
                <Button disabled variant='glass' size='sm' className='w-full justify-start px-3 py-3 text-base leading-6 font-medium'>
                    <CubeTransparentIcon className='h-6 w-6 text-gray-700 ' />
                    <span className="text-gray-800">Project: </span>
                    <span className="text-gray-500">Loading</span>
                    <ChevronDownIcon className='ml-auto h-4 w-4 text-gray-400' />
                </Button>
            ) : (
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                        <Button variant='glass' size='sm' className='w-full justify-start px-3 py-3 text-base leading-6 font-medium'>
                            <CubeTransparentIcon className='h-6 w-6 text-gray-700 ' />
                            <span className="text-gray-800">Project: </span>
                            <span className="text-gray-500">{currentProject ? (currentProject.projectName) : ('Select project...')}</span>
                            <ChevronDownIcon className='ml-auto h-4 w-4 text-gray-400' />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[350px] bg-primary-50 p-0'>
                        <Command>
                            <CommandInput placeholder="Search project..." />
                            <CommandGroup>
                                {Array.isArray(projects) ? (
                                    projects.map((project) => (
                                        <CommandItem
                                            key={project.id}
                                            value={project.projectName}
                                            className={cn('px-6 py-[16px]',
                                                project.id === currentProject.id && 'bg-primary-50'

                                            )}
                                            onSelect={() => handleSelectProject(project)}
                                        >
                                            {project.projectName}
                                        </CommandItem>
                                    ))
                                ) : (
                                    <div>
                                        <CommandItem
                                            key={projects.id}
                                            value={projects.projectName}
                                            className='px-6 py-[16px]'
                                            onSelect={() => handleSelectProject(projects)}
                                        >
                                            {projects.projectName}
                                        </CommandItem>
                                    </div>
                                )}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            )}
        </div>
    )
}

export default ProjectSelectionButton;

