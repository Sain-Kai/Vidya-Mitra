import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const CameraReticle = ({
  selectionMode = 'paragraph',
  onToggleMode,
  samplePassageText,
}) => {
  const isLineMode = selectionMode === 'line';

  return (
    <View style={styles.container}>
      <View style={styles.viewfinder}>
        <View style={[styles.selectionBox, isLineMode && styles.selectionBoxLine]}>
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />

          <Text
            style={styles.detectedText}
            numberOfLines={isLineMode ? 1 : 4}
            ellipsizeMode="tail"
          >
            {samplePassageText}
          </Text>
        </View>

        <View style={styles.toolsRow}>
          <Text style={styles.hintText}>
            Align book text inside rectangle
          </Text>

          <View style={styles.modeToggleGroup}>
            <TouchableOpacity
              style={[styles.modeBtn, !isLineMode && styles.modeBtnActive]}
              onPress={() => onToggleMode && onToggleMode('paragraph')}
            >
              <Text style={styles.modeBtnText}>Paragraph</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeBtn, isLineMode && styles.modeBtnActive]}
              onPress={() => onToggleMode && onToggleMode('line')}
            >
              <Text style={styles.modeBtnText}>Line</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: '#0a0a10',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  viewfinder: {
    width: width - 40,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionBox: {
    width: '100%',
    height: 110,
    borderColor: 'rgba(102, 126, 234, 0.6)',
    borderWidth: 1.5,
    borderRadius: 8,
    backgroundColor: 'rgba(102, 126, 234, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    position: 'relative',
  },
  selectionBoxLine: {
    height: 50,
  },
  corner: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderColor: '#667eea',
  },
  cornerTL: { top: -2, left: -2, borderTopWidth: 3, borderLeftWidth: 3 },
  cornerTR: { top: -2, right: -2, borderTopWidth: 3, borderRightWidth: 3 },
  cornerBL: { bottom: -2, left: -2, borderBottomWidth: 3, borderLeftWidth: 3 },
  cornerBR: { bottom: -2, right: -2, borderBottomWidth: 3, borderRightWidth: 3 },
  detectedText: {
    color: '#ffffff',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 18,
  },
  toolsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 6,
  },
  hintText: {
    color: '#a0a0b8',
    fontSize: 11,
  },
  modeToggleGroup: {
    flexDirection: 'row',
    gap: 4,
  },
  modeBtn: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: '#27273a',
  },
  modeBtnActive: {
    backgroundColor: '#667eea',
  },
  modeBtnText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
});

export default CameraReticle;
