import { ClearIcon } from './icons/clear-icon';

function ClearFile({ onClick }: { onClick: () => void }) {
  return (
    <div onClick={onClick}>
      <ClearIcon />
    </div>
  );
}

export default ClearFile;
