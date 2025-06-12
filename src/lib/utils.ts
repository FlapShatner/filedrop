export const formatBytes = (bytes: number | string | undefined | null) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == null || bytes === '') return '0 Bytes';
  const numBytes = typeof bytes === 'string' ? parseFloat(bytes) : bytes;
  if (isNaN(numBytes) || !isFinite(numBytes)) return '0 Bytes';
  if (numBytes <= 0) return '0 Bytes';
  const i = Math.floor(Math.log(numBytes) / Math.log(1024));
  const sizeIndex = Math.min(i, sizes.length - 1);
  return (
    (numBytes / Math.pow(1024, sizeIndex)).toFixed(2) + ' ' + sizes[sizeIndex]
  );
};
