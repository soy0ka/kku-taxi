import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@gluestack-ui/themed'
import React from 'react'

export const feedbackAccordion: React.FC = () => {
  return (
    <Accordion
      width="100%"
      size="md"
      variant="unfilled"
      type="single"
      isCollapsible={true}
      isDisabled={false}
    >
      <AccordionItem value="a">
        <AccordionHeader>
          <AccordionTrigger>
            {({ isExpanded }) => (
              <>
                <AccordionTitleText>
                  이 이용자에게 문제가 있었나요?
                </AccordionTitleText>
                {isExpanded ? (
                  <AccordionIcon as={ChevronUpIcon} />
                ) : (
                  <AccordionIcon as={ChevronDownIcon} />
                )}
              </>
            )}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          {[
            '제 시간에 도착하지 않았어요',
            '정산 금액을 보내지 않았어요',
            '장소에 나타나지 않았어요',
            '비매너 행동을 했어요'
          ].map((value) => (
            <Checkbox
              size="md"
              mt="$0.5"
              aria-label="Checkbox"
              value={''}
              key={value}
            >
              <CheckboxIndicator mr="$2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>{value}</CheckboxLabel>
            </Checkbox>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
