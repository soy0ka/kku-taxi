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

interface Issue {
  label: string
  value: string
}
interface FeedbackAccordionProps {
  selectedIssues: string[] // 선택된 문제 항목들의 값 배열
  // eslint-disable-next-line no-unused-vars
  onChange: (selected: string[]) => void // 선택 항목이 변경될 때 호출되는 콜백
}

export const FeedbackAccordion: React.FC<FeedbackAccordionProps> = ({
  selectedIssues = [],
  onChange = () => {}
}) => {
  const handleCheckboxChange = (issueValue: string) => {
    if (selectedIssues.includes(issueValue)) {
      onChange(selectedIssues.filter((selected) => selected !== issueValue))
    } else {
      onChange([...selectedIssues, issueValue])
    }
  }

  const issues: Issue[] = [
    { label: '미터기 요금과 다른 금액을 요구했어요', value: 'DIFFERENT_FARE' },
    { label: '장소에 나타나지 않았어요 (노쇼)', value: 'NO_SHOW' },
    { label: '제 시간에 도착하지 않았어요 (지각)', value: 'LATE' },
    { label: '정산 금액을 보내지 않았어요', value: 'NO_PAYMENT' },
    { label: '비매너 행동을 했어요', value: 'BAD_MANNER' }
  ]

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
          {issues.map((issue) => (
            <Checkbox
              size="md"
              mt="$0.5"
              aria-label="Checkbox"
              value={issue.value}
              key={issue.value}
              isChecked={selectedIssues.includes(issue.value)}
              onChange={() => handleCheckboxChange(issue.value)}
            >
              <CheckboxIndicator mr="$2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>{issue.label}</CheckboxLabel>
            </Checkbox>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
