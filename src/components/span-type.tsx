

interface SpanTypeProps {
    type: string

}

export const SpanTypeComponent = ({ type }: SpanTypeProps) => {

    return (
        <span className={`text-sm font-semibold text-white rounded-full px-3 py-1`} style={{
            backgroundColor: `var(--type-${type})`
        }}>
            {type}
        </span>
    )
}