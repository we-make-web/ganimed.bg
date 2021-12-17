import React from 'react';
import cx from 'classnames';

type IconName = 'check-circle-fill' | 'exclamation-diamond-fill' | 'search';

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className, size }): JSX.Element => {
  return (
    <svg className={cx('bi', className)} width={size || 32} height={size || 32} fill="currentColor">
      <use href={`/static/icons/bootstrap-icons.svg#${name}`} />
    </svg>
  );
};
