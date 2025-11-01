import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { millisecondsToHuman } from '../utils/TimerUtils';
import TimerButton from './TimerButton';

export default function Timer({ id, title, project, elapsed, isRunning, onEdit, onRemove, onToggle }) {
    const [elapsedTime, setElapsedTime] = useState(parseInt(elapsed))
    let elapsedString = millisecondsToHuman(elapsedTime);

    const [isRunningLocal, setIsRunningLocal] = useState(Boolean(isRunning));

    useEffect(() => setIsRunningLocal(Boolean(isRunning)), [isRunning]);
    useEffect(() => setElapsedTime(parseInt(elapsed) || 0), [elapsed]);

    useEffect(() => {
      let intervalId;
      if (isRunningLocal) {
        intervalId = setInterval(() => {
          setElapsedTime(prev => prev + 1000);
        }, 1000);
      }
      return () => {
        if (intervalId) clearInterval(intervalId);
      };
    }, [isRunningLocal]);

    const handleStartPress = () => {
      setIsRunningLocal(r => !r);
      onToggle();
    };

    return (
        <View style={styles.timerContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text>{project}</Text>
            <Text style={styles.elapsedTime}>{elapsedString}</Text>
            <View style={styles.buttonGroup}>
                <TimerButton color="blue" small title="Endre" toggleChange={() => onEdit(elapsedTime)}/>
                <TimerButton color="blue" small title="Fjern" toggleChange={onRemove}/>
            </View>
            <TimerButton color={isRunningLocal ? "#fa0000ff" : "#21BA45"} title={isRunningLocal ? "Stopp" : "Start"} toggleChange={handleStartPress} />
        </View>
    );
}

const styles = StyleSheet.create({
    timerContainer: {
        backgroundColor: 'white',
        borderColor: '#d6d7da',
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        margin: 15,
        marginBottom: 0,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    elapsedTime: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 15,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
   
    