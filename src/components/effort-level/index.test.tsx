import React from 'react';
import { render } from '@testing-library/react';
import { EffortLevel, EffortLevelProps } from './index';
import { Effort, Priority } from '@/utils';
import { LevelItem } from '@/components/level-item';

jest.mock('@/components/level-item', () => ({
  LevelItem: jest.fn(() => <div data-testid='level-item' />),
}));

describe('EffortLevel Component', () => {
  beforeEach(() => {
    (LevelItem as jest.MockedFunction<typeof LevelItem>).mockClear();
  });

  const renderComponent = (props: EffortLevelProps) =>
    render(<EffortLevel {...props} />);

  it('should render the correct number of LevelItem components for EASY effort', () => {
    const { getAllByTestId } = renderComponent({
      effort: Effort.EASY,
      priority: Priority.HIGH,
    });
    expect(getAllByTestId('level-item')).toHaveLength(3);
  });

  it('should render correct priority for EASY effort', () => {
    renderComponent({
      effort: Effort.EASY,
      priority: Priority.HIGH,
    });
    expect(LevelItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ priority: Priority.HIGH }),
      {},
    );
    expect(LevelItem).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ priority: Priority.DEFAULT }),
      {},
    );
    expect(LevelItem).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({ priority: Priority.DEFAULT }),
      {},
    );
  });

  it('should render the correct number of LevelItem components for MODERATE effort', () => {
    const { getAllByTestId } = renderComponent({
      effort: Effort.MODERATE,
      priority: Priority.MEDIUM,
    });
    expect(getAllByTestId('level-item')).toHaveLength(3);
  });

  it('should render the correct priority for MODERATE effort', () => {
    renderComponent({
      effort: Effort.MODERATE,
      priority: Priority.MEDIUM,
    });
    expect(LevelItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ priority: Priority.MEDIUM }),
      {},
    );
    expect(LevelItem).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ priority: Priority.MEDIUM }),
      {},
    );
    expect(LevelItem).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({ priority: Priority.DEFAULT }),
      {},
    );
  });

  it('should render the correct number of LevelItem components for HARD effort', () => {
    const { getAllByTestId } = renderComponent({
      effort: Effort.HARD,
      priority: Priority.LOW,
    });
    expect(getAllByTestId('level-item')).toHaveLength(3);
  });

  it('should render the correct priority for HARD effort', () => {
    renderComponent({
      effort: Effort.HARD,
      priority: Priority.LOW,
    });
    expect(LevelItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ priority: Priority.LOW }),
      {},
    );
    expect(LevelItem).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ priority: Priority.LOW }),
      {},
    );
    expect(LevelItem).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({ priority: Priority.LOW }),
      {},
    );
  });
});
