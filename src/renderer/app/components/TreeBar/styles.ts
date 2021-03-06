import styled from 'styled-components';
import { icons, transparency } from '~/renderer/defaults';
import { centerImage } from '@mixins';

export const Root = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  padding-left: 32px;
  border-bottom: 1px solid rgba(0, 0, 0, ${transparency.light.dividers});
  overflow: hidden;
  background-color: white;
`;

export const ForwardIcon = styled.div`
  width: 18px;
  height: 18px;
  margin-left: 4px;
  background-image: url(${icons.forward});
  opacity: ${transparency.light.inactiveIcon};

  ${centerImage('100%', 'auto')};
`;
