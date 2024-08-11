/* eslint-disable react/prop-types */
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger
} from '@gluestack-ui/themed'
import React from 'react'

interface DestinationSelectorProps {
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: number) => void
  props: {
    title: string
  }
}
export const DestinationSelector: React.FC<DestinationSelectorProps> = ({
  props,
  onChange
}) => {
  const places = [
    '충주역',
    '충주터미널',
    '건국대학교 정문',
    '건국대학교 후문',
    '건국체육관',
    '중원도서관',
    '신촌마을',
    '해오름기숙사',
    '모시래마을 & 기숙사'
  ]

  return (
    <Select
      onValueChange={(value) => {
        if (onChange) {
          onChange(parseInt(value))
        }
      }}
    >
      <SelectTrigger variant="outline" size="md">
        <SelectInput placeholder={props?.title} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          {places.map((place, index) => (
            <SelectItem label={place} value={String(index)} key={index} />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  )
}
