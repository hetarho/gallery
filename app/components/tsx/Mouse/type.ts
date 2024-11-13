type MouseFollowerProps = {
  children?: React.ReactNode;
  spring?: number;
};

interface Position {
  x: number;
  y: number;
}

interface MouseContextType {
  mousePosition: Position;
}

export type { MouseContextType, MouseFollowerProps, Position };
