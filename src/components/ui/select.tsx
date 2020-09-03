import React, { useState, useRef } from 'react'
import { Flex, Text, Box } from 'rebass'
import styled from 'styled-components'
import { ReactComponent as DownArrow } from 'assets/down-arrow.svg'
import { CSSTransition } from 'react-transition-group'
import { useClickOutsideEffect } from 'hooks/useClickOutsideEffect'

const DURATION = 250

export interface ISelectOption<T> {
    value: T;
    label: string;
}

interface IProps<T> {
    options: ISelectOption<T>[];
    onSelect: (opt: ISelectOption<T>) => void;
    initValue?: ISelectOption<T>;
    placeholder?: string;
}

export function Select<T> ({ options, onSelect, initValue, placeholder = 'Select' }: IProps<T>) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [value, setValue] = useState<ISelectOption<T> | undefined>(initValue)

  const wrapperRef = useRef<HTMLDivElement>(null)
  useClickOutsideEffect(wrapperRef, () => setIsExpanded(false))

  const handleSelect = (opt: ISelectOption<T>) => {
    setIsExpanded(false)
    setValue(opt)
    onSelect(opt)
  }

  return (
    <BoxStyled
      ref={wrapperRef}
    >
      <Flex
        py={1}
        alignItems='center'
        justifyContent='space-between'
        backgroundColor='white'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Text
          mr={1}
          sx={{
            whiteSpace: 'nowrap'
          }}
          color={value === undefined ? 'secondary' : ''}
        >
          {value !== undefined ? value.label : placeholder}
        </Text>
        <DownArrow
          fill='#000'
          height='12px'
          style={isExpanded ? { transform: 'rotateX(180deg)' } : undefined}
        />
      </Flex>
      <CSSTransition
        in={isExpanded}
        timeout={DURATION}
        unmountOnExit
        classNames='drop-down'
      >
        <Box
          backgroundColor='white'
          sx={{
            position: 'absolute',
            zIndex: 5,
            right: 0
          }}
        >
          {options.filter(i => i !== value).map((option, index) =>
            <Text
              key={index}
              py={1}
              px={2}
              onClick={() => handleSelect(option)}
              className='option'
            >
              {option.label}
            </Text>
          )}
        </Box>
      </CSSTransition>
    </BoxStyled>
  )
}

const BoxStyled = styled(Box)`
    cursor: pointer;
    position: relative;

    .option {
        white-space: nowrap;
        &:hover { 
            background-color: #dcdcdcdc;
        }
    }

    .drop-down-enter {
        opacity: 0;
        transform: translateY(-20px);
    }
    .drop-down-enter-active {
        opacity: 1;
        transform: translateY(0);
        transition: opacity ${`${DURATION}ms`} ease-in-out,  transform ${`${DURATION}ms`} ease-in-out;
    }
    .drop-down-exit {
        opacity: 1;
        transform: translateY(0);
    }
    .drop-down-exit-active {
        opacity: 0;
        transform: translateY(-10px);
        transition: opacity ${`${DURATION}ms`} ease-in-out,  transform ${`${DURATION}ms`} ease-in-out;
    }
`
