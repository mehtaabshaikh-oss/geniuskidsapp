import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import PlaceholderCell from '@/components/PlaceholderCell';
import BottomSheetCard from '@/components/BottomSheetCard';
// Use require since there is no @types declaration for this json by default, or just import
const topicsData = require('@/assets/data/topics.json');

export default function LessonScreen() {
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);

  // We are using the first topic (The Cell)
  const cellTopic = topicsData[0];

  const handlePartClick = (partId: string) => {
    setSelectedPartId(partId);
  };

  const selectedPartData = cellTopic.interactive_parts.find(
    (part: any) => part.svg_path_id === selectedPartId
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{cellTopic.topic}</Text>
        <Text style={styles.subtitle}>Tap a part of the cell to learn more!</Text>
      </View>

      <View style={styles.svgContainer}>
        <PlaceholderCell onPartClick={handlePartClick} />
      </View>

      {selectedPartData && (
        <BottomSheetCard
          title={selectedPartData.name}
          factKid={selectedPartData.fact_kid}
          factGenius={selectedPartData.fact_genius}
          onClose={() => setSelectedPartId(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 24,
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  svgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
