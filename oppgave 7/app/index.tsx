import React, { createContext, useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import EditableTimer from '../components/EditableTimer';
import ToggleableTimerForm from '../components/ToggleableTimerForm';

export default function App() {

  const [timers, setTimers] = useState([{
    key: 24,
    id: 1, 
    title: "Klippe plenen", 
    project: "Hageaktivitet", 
    elapsed: 9896300, 
    isRunning: true, 
    isEditing: false}])

  interface TimerVariables {
    key: number,
    id: number, 
    title: string, 
    project: string, 
    elapsed: number, 
    isRunning: boolean, 
    isEditing: boolean
  }

  function handleCreateFormSubmit(timer:TimerVariables){
    const newTimer = {
      key: timer.key,
      id: timers.length + 1,
      title: timer.title,
      project: timer.project,
      elapsed: 0,
      isRunning: false,
      isEditing: false
    };
    setTimers([newTimer, ...timers]);
  };

  function removeTimer(id:number) {
    console.log(id);
    setTimers(timers.filter(item => item.id !== id));
  }

  useEffect(() => {
    if (timers.length > 0 && timers[0].key === 24) {
      setTimers(prev => prev.slice(1));
    }
  }, []);
  
  return (
    <View style={styles.appContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Tidsmålere</Text>
      </View>
      <ScrollView style={styles.timerList}>
        <ToggleableTimerForm onFormSubmit={handleCreateFormSubmit} />
        {timers.map((timer:TimerVariables) => {
        return (
          <EditableTimer
            key={timer.key}
            id={timer.id}
            title={timer.title}
            project={timer.project}
            elapsed={timer.elapsed}
            isRunning={timer.isRunning}
            onRemove={removeTimer}
          />
        )}
        
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#E6E6E6',
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
    timerList: {
    paddingBottom: 15,
  },  
});