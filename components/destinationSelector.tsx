import React from 'react'
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@gluestack-ui/themed'

interface DestinationSelectorProps {
  props: {
    title: string
  }
}
export const DestinationSelector: React.FC<DestinationSelectorProps> = ({ props }) => {
  const places = [
    '건국대학교 정문',
    '건국대학교 후문',
    '모시래마을 & 기숙사',
    '중원도서관',
    '신촌마을',
    '해오름기숙사',
    '충주역',
    '충주터미널',
  ]

  return (
    <Select>
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
