import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import TimerButton from './TimerButton';
import TimerForm from './TimerForm';

export default function ToggleableTimerForm({onFormSubmit}) {
    
    const [isOpen, setIsOpen] = useState(false);

    function getData(data) {
      return {
        key: Date.now(),
        id: 0, 
        title: data[1],
        project: data[2],
        elapsed: 0,
        isRunning: true,
        isEditing: false,
      };
    }

    return (
        <View style={[styles.container, !isOpen && styles.buttonPadding]}>
            {isOpen ? (
                <TimerForm onUpdate={(data) => {
                  const dataToAdd = getData(data);
                  setIsOpen(!isOpen)
                  onFormSubmit({
                    key: Date.now(),
                    id: dataToAdd.id,
                    title: dataToAdd.title,
                    project: dataToAdd.project,
                    elapsed: dataToAdd.elapsed,
                    isRunning: dataToAdd.isRunning,
                    isEditing: dataToAdd.isEditing
                  })
                }}
                onClose={() => {if (isOpen) setIsOpen(false)}} />
            ) : (
                <TimerButton
                    title="+"
                    color="black"
                    toggleChange={() => setIsOpen(!isOpen)}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    buttonPadding: {
        paddingHorizontal: 15,
    },
});