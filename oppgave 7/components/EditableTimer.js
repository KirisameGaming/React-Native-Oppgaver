import React from 'react';

import TimerForm from './TimerForm';
import Timer from './Timer'

export default function EditableTimer({
    id,
    title,
    project,
    elapsed,
    isRunning,
    onRemove
}) {
  const [isFirstTime, setFirstTime] = React.useState(true);
  const [isTimerRunning, setIsTimerRunning] = React.useState(false);
  const [elapsedSoFar, setElapsedSoFar] = React.useState(elapsed);
  const [editFormOpen, setEditFormOpen] = React.useState(false);
  const [currentTitle, setTitle] = React.useState("");
  const [currentProject, setProject] = React.useState("");

  function handleEditThing(elapsedTime)
  {
    setEditFormOpen(true)
    setElapsedSoFar(elapsedTime)
  }

  function handleTitleDescriptionEdits(data)
  {
    console.log(data[1])
    setTitle(data[1])
    setProject(data[2])
    setEditFormOpen(false)
  }

  if (isFirstTime)
  {
    console.log(title)
    setTitle(title)
    setProject(project)
    setElapsedSoFar(elapsed)
    setIsTimerRunning(isRunning);
    setFirstTime(false);
    setEditFormOpen(editFormOpen)
  }
    if (editFormOpen) {
        return <TimerForm id={id} title={currentTitle} project={currentProject} onUpdate={(data) => handleTitleDescriptionEdits(data)} onClose={() => setEditFormOpen(false)}
        
        />;
    }
    return (
        <Timer
            id={id}
            title={currentTitle}
            project={currentProject}
            elapsed={elapsedSoFar}
            isRunning={isTimerRunning}
            onEdit={handleEditThing}
            onRemove={() => onRemove(id)}
            onToggle={() => setIsTimerRunning(isTimerRunning === !isTimerRunning)}

        /> 
    );
}
    