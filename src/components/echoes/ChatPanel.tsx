import type { HistoricalFigure } from "@/data/types";

interface ChatPanelProps {
  figure: HistoricalFigure;
}

export function ChatPanel({ figure }: ChatPanelProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Messages area */}
      <div
        role="log"
        aria-label={`Conversation with ${figure.name}`}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {figure.sampleDialogue.map((message, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: message.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            {/* Figure name label */}
            {message.role === "figure" && (
              <span
                className="font-sans"
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--atlas-mid-grey)",
                  marginBottom: 4,
                  paddingLeft: 4,
                }}
              >
                {figure.name}
              </span>
            )}

            <div
              className="font-sans"
              style={{
                padding: "12px 16px",
                maxWidth: "80%",
                fontSize: 15,
                lineHeight: 1.5,
                borderRadius:
                  message.role === "user"
                    ? "4px 4px 2px 4px"
                    : "4px 4px 4px 2px",
                backgroundColor:
                  message.role === "user"
                    ? "color-mix(in srgb, var(--atlas-accent) 10%, transparent)"
                    : "var(--atlas-off-white)",
                color: "var(--atlas-charcoal)",
              }}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div
        style={{
          padding: "16px 24px",
          borderTop: "1px solid var(--atlas-light-grey)",
        }}
      >
        <input
          type="text"
          disabled
          aria-label={`Send a message to ${figure.name}`}
          placeholder="Chat coming soon in v2..."
          className="font-sans"
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 4,
            border: "1px solid var(--atlas-light-grey)",
            backgroundColor: "var(--atlas-off-white)",
            opacity: 0.6,
            fontSize: 15,
            color: "var(--atlas-charcoal)",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>
    </div>
  );
}
