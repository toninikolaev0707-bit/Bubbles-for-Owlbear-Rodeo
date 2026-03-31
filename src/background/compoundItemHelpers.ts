import {
  AttachmentBehavior,
  Item,
  Vector2,
  buildCurve,
  buildLabel,
  buildShape,
  buildText,
} from "@owlbear-rodeo/sdk";
import { createRoundedRectangle, getFillPortion } from "./mathHelpers";

// Constants used in multiple functions
const FONT_SIZE = 22;
const FONT = "Roboto, sans-serif";
const LOCKED = true;
const DISABLE_HIT = true;
const BACKGROUND_OPACITY = 0.6;
const DISABLE_ATTACHMENT_BEHAVIORS: AttachmentBehavior[] = [
  "ROTATION",
  "VISIBLE",
  "COPY",
  "SCALE",
  // "POSITION",
];
export const TEXT_VERTICAL_OFFSET = -0.3;
const LINE_HEIGHT = 0.95;

// Constants used in createStatBubble()
export const DIAMETER = 30;
const CIRCLE_FONT_SIZE = DIAMETER - 8;
const REDUCED_CIRCLE_FONT_SIZE = DIAMETER - 15;
const CIRCLE_TEXT_HEIGHT = DIAMETER + 0;

export function createTempHpShield(
  item: Item,
  value: number,
  position: { x: number; y: number },
  backgroundId: string,
  textId: string,
): Item[] {
  const WIDTH = 34;
  const HEIGHT = 40;


	
  const shieldShape = buildCurve()
    .position(position)
    .points([
      { x: 0, y: -HEIGHT / 2 },
      { x: WIDTH / 2, y: -HEIGHT / 3 },
      { x: WIDTH / 2, y: HEIGHT / 6 },
      { x: 0, y: HEIGHT / 2 },
      { x: -WIDTH / 2, y: HEIGHT / 6 },
      { x: -WIDTH / 2, y: -HEIGHT / 3 },
    ])
    .fillColor("#0096C9")
    .fillOpacity(0.5)
    .strokeColor("#FFFFFF")
    .strokeWidth(2)
    .strokeOpacity(0.8)
    .closed(true)
    .tension(0.1)
    .attachedTo(item.id)
    .layer("ATTACHMENT")
    .locked(true)
    .id(backgroundId)
    .visible(item.visible)
    .disableAttachmentBehavior(["ROTATION", "VISIBLE", "COPY", "SCALE"])
    .disableHit(true)
    .build();



  // 🔥 ВОТ ЭТО ТЫ ИЩЕШЬ
  const textValue = value.toString();

  let fontSize = Math.floor(WIDTH / textValue.length * 1.6);
  fontSize = Math.min(fontSize, 18); // максимум
  fontSize = Math.max(fontSize, 8);  // минимум

  const valueText = buildText()
    .position({
      x: position.x - WIDTH / 2,
      y: position.y - HEIGHT / 2,
    })
    .plainText(textValue)
    .textAlign("CENTER")
    .textAlignVertical("MIDDLE")
    .fontSize(fontSize) // ← динамический размер
    .fontFamily("Roboto, sans-serif")
    .textType("PLAIN")
    .fillColor("#FFFFFF")
    .width(WIDTH)
    .height(HEIGHT)
    .zIndex(30000)
    .attachedTo(item.id)
    .layer("TEXT")
    .locked(true)
    .id(textId)
    .visible(item.visible)
    .disableAttachmentBehavior([
      "ROTATION",
      "VISIBLE",
      "COPY",
      "SCALE",
    ])
    .disableHit(true)
    .build();

  return [shieldShape, valueText];
}


export function createTempHpDroplet(
  item: Item,
  value: number,
  position: { x: number; y: number },
  backgroundId: string,
  textId: string,
): Item[] {
  const SIZE = 38;


  const t = SIZE / 5;   // толщина перекладин
  const h = SIZE / 2.3;   // половина размера


  const diamond = buildCurve()
    .position(position)
	.points([
	  { x: -t, y: -h },
	  { x: t, y: -h },

	  { x: t, y: -t },
	  { x: h, y: -t },

	  { x: h, y: t },
	  { x: t, y: t },

	  { x: t, y: h },
	  { x: -t, y: h },

	  { x: -t, y: t },
	  { x: -h, y: t },

	  { x: -h, y: -t },
	  { x: -t, y: -t },
	])
	.tension(1) // ← ВОТ ЭТО КЛЮЧ
    .fillColor("#5BFE79")
    .fillOpacity(0.5)
    .strokeColor("#FFFFFF")
    .strokeWidth(2)
    .strokeOpacity(0.8)
    .closed(true)
    .attachedTo(item.id)
    .layer("ATTACHMENT")
    .locked(true)
    .id(backgroundId)
    .visible(item.visible)
    .disableAttachmentBehavior([
      "ROTATION",
      "VISIBLE",
      "COPY",
      "SCALE",
    ])
    .disableHit(true)
    .build();

	
	const valueText = value.toString();


	let fontSize = Math.floor(SIZE / valueText.length * 0.8);
	fontSize = Math.min(fontSize, SIZE - 24);
	fontSize = Math.max(fontSize, 8);

  const text = buildText()
    .position({
      x: position.x - SIZE / 2,
      y: position.y - SIZE / 2 + 0.5,
    })
    .plainText(value.toString())
    .textAlign("CENTER")
    .textAlignVertical("MIDDLE")
	

	
	
	
    .fontSize(fontSize)
    .fontFamily("Roboto, sans-serif")
    .textType("PLAIN")
    .fillColor("#FFFFFF")
    .width(SIZE)
    .height(SIZE)
    .attachedTo(item.id)
    .layer("TEXT")
    .locked(true)
    .id(textId)
    .visible(item.visible)
    .disableAttachmentBehavior([
      "ROTATION",
      "VISIBLE",
      "COPY",
      "SCALE",
    ])
    .disableHit(true)
    .build();

  return [diamond, text];
}

/** Creates Stat Bubble component items */
export function createStatBubble(
  item: Item,
  value: number,
  color: string,
  position: { x: number; y: number },
  backgroundId: string,
  textId: string,
): Item[] {
  const backgroundShape = buildShape()
    .width(DIAMETER)
    .height(DIAMETER)
    .shapeType("CIRCLE")
    .fillColor(color)
    .fillOpacity(0.25) // почти прозрачный
    .strokeColor(color)
    .strokeOpacity(0.9)
    .strokeWidth(2)
    .position({ x: position.x, y: position.y })
    .attachedTo(item.id)
    .layer("ATTACHMENT")
    .locked(LOCKED)
    .id(backgroundId)
    .visible(item.visible)
    .disableAttachmentBehavior(DISABLE_ATTACHMENT_BEHAVIORS)
    .disableHit(DISABLE_HIT)
    .build();

const valueText = value.toString();

let fontSize = Math.floor(DIAMETER / valueText.length * 1.6);
fontSize = Math.min(fontSize, CIRCLE_FONT_SIZE);
fontSize = Math.max(fontSize, 6);

const bubbleText = buildText()
  .position({
    x: position.x - DIAMETER / 2,
    y: position.y - DIAMETER / 2 + TEXT_VERTICAL_OFFSET + 0.8,
  })
  .plainText(valueText)
  .textAlign("CENTER")
  .textAlignVertical("MIDDLE")
  .fontSize(fontSize)
  .fontFamily(FONT)
  .textType("PLAIN")
  .height(CIRCLE_TEXT_HEIGHT)
  .width(DIAMETER)
  .fontWeight(400)
  .lineHeight(1)
  .attachedTo(item.id)
  .layer("TEXT")
  .locked(LOCKED)
  .id(textId)
  .visible(item.visible)
  .disableAttachmentBehavior(DISABLE_ATTACHMENT_BEHAVIORS)
  .disableHit(DISABLE_HIT)
  .build();

  return [backgroundShape, bubbleText];
}

// Constants used in createHealthBar()
const BAR_PADDING = 2;
const HEALTH_OPACITY = 0.7;
export const FULL_BAR_HEIGHT = 18;
export const SHORT_BAR_HEIGHT = 12;
const BAR_CORNER_RADIUS = 20;


/** Creates health bar component items */
export function createHealthBar(
  item: Item,
  bounds: { width: number; height: number },
  health: number,
  maxHealth: number,
  statsVisible: boolean,
  origin: { x: number; y: number },
  variant: "full" | "short" = "full",
  segments = 0,
): Item[] {
  let barHeight: number;
  if (variant === "short") {
    barHeight = SHORT_BAR_HEIGHT;
  } else {
    barHeight = FULL_BAR_HEIGHT;
  }
  const position = {
    x: origin.x - bounds.width / 2 + BAR_PADDING,
    y: origin.y - barHeight - 2,
  };
  const barWidth = bounds.width - BAR_PADDING * 2;
  const barTextHeight = barHeight + 2;
  const setVisibilityProperty = item.visible;

  let healthBackgroundColor = "#1a1a1a";
  if (!statsVisible) {
    healthBackgroundColor = "blue";
  }

  const backgroundShape = buildCurve()
    .fillColor(healthBackgroundColor)
    .fillOpacity(BACKGROUND_OPACITY)
	
    .position({ x: position.x, y: position.y })
    .zIndex(10000)
    .attachedTo(item.id)
    .layer("ATTACHMENT")
    .locked(LOCKED)
    .id(hpBackgroundId(item.id))
    .visible(setVisibilityProperty)
    .disableAttachmentBehavior(DISABLE_ATTACHMENT_BEHAVIORS)
    .disableHit(DISABLE_HIT)
    .strokeWidth(0)
	.strokeColor("#000000")
	.strokeOpacity(0.6)
    .tension(0)
    .closed(true)
    .points(createRoundedRectangle(barWidth, barHeight, BAR_CORNER_RADIUS))
    .build();

  const healthFillPortion = getFillPortion(health, maxHealth, segments);

  const healthRatio = health / maxHealth;

  let fillColor = "#FF5451"; // зелёный

  if (healthRatio < 0.5) fillColor = "#C35553"; // оранжевый
  if (healthRatio < 0.25) fillColor = "#95514F"; // красный


  const fillShape = buildCurve()
  
  
  
    .fillColor(fillColor)
    .fillOpacity(HEALTH_OPACITY)
    .zIndex(20000)
    .position({ x: position.x, y: position.y })
    .strokeWidth(0)
    .strokeOpacity(0)
    .attachedTo(item.id)
    .layer("ATTACHMENT")
    .locked(LOCKED)
    .id(hpFillId(item.id))
    .visible(setVisibilityProperty)
    .disableAttachmentBehavior(DISABLE_ATTACHMENT_BEHAVIORS)
    .disableHit(DISABLE_HIT)
    .tension(0)
    .closed(true)
    .points(
      createRoundedRectangle(
        barWidth,
        barHeight,
        BAR_CORNER_RADIUS,
        healthFillPortion,
      ),
    )
    .build();

  if (variant === "short") {
    return [backgroundShape, fillShape];
  }

  const healthText = buildText()
    .position({ x: position.x, y: position.y + TEXT_VERTICAL_OFFSET + 0.25})
    .plainText(`${health}/${maxHealth}`)
    .textAlign("CENTER")
    .textAlignVertical("TOP")
    .fontSize(FONT_SIZE - 4)
    .fontFamily(FONT)
    .textType("PLAIN")
    .height(barTextHeight)
    .width(barWidth)
    .fontWeight(400)
    .attachedTo(item.id)
    .fillOpacity(1)
    .layer("TEXT")
    .lineHeight(LINE_HEIGHT)
    .locked(LOCKED)
    .id(hpTextId(item.id))
    .visible(setVisibilityProperty)
    .disableAttachmentBehavior(DISABLE_ATTACHMENT_BEHAVIORS)
    .disableHit(DISABLE_HIT)
    .build();

  return [backgroundShape, fillShape, healthText];
}



// Constants used in createNameTag()
export const APPROXIMATE_LETTER_WIDTH = 12;
export const NAME_TAG_HEIGHT = 26;

/** Create name tag component items */
export function createNameTag(
  item: Item,
  sceneDpi: number,
  plainText: string,
  position: Vector2,
  pointerDirection: "UP" | "DOWN",
): Item[] {
  const nameTagText = buildLabel()
    .maxViewScale(1)
    .minViewScale(1)
    .position(position)
    .plainText(plainText)
    .fontSize(FONT_SIZE)
    .fontFamily(FONT)
    .fontWeight(400)
    .pointerHeight(0)
    .pointerDirection(pointerDirection)
    .attachedTo(item.id)
    .fillOpacity(0.87)
    .layer("TEXT")
    .cornerRadius(sceneDpi / 12)
    .padding(sceneDpi / 50)
    .backgroundOpacity(BACKGROUND_OPACITY)
    .locked(LOCKED)
    .id(getNameTagId(item.id))
    .visible(item.visible)
    .disableAttachmentBehavior(DISABLE_ATTACHMENT_BEHAVIORS)
    .disableHit(DISABLE_HIT)
    .build();

  return [nameTagText];
}

// Item Ids
export const getNameTagId = (itemId: string) => `${itemId}-name-tag`;

export const hpTextId = (itemId: string) => `${itemId}-health-text`;
export const hpFillId = (itemId: string) => `${itemId}-health-fill`;
export const hpBackgroundId = (itemId: string) => `${itemId}-health-background`;

export const acTextId = (itemId: string) => `${itemId}-ac-text`;
export const acBackgroundId = (itemId: string) => `${itemId}-ac-background`;

export const thpTextId = (itemId: string) => `${itemId}-temp-hp-text`;
export const thpBackgroundId = (itemId: string) =>
  `${itemId}-temp-hp-background`;

// Item Id utilities
export function addAllExtensionAttachmentsToArray(
  array: any[],
  itemId: string,
) {
  addHealthAttachmentsToArray(array, itemId);
  addArmorAttachmentsToArray(array, itemId);
  addTempHealthAttachmentsToArray(array, itemId);
  addNameTagAttachmentsToArray(array, itemId);
}

export function addHealthAttachmentsToArray(array: any[], itemId: string) {
  array.push(hpTextId(itemId), hpFillId(itemId), hpBackgroundId(itemId));
}

export function addArmorAttachmentsToArray(array: any[], itemId: string) {
  array.push(acTextId(itemId), acBackgroundId(itemId));
}

export function addTempHealthAttachmentsToArray(array: any[], itemId: string) {
  array.push(thpTextId(itemId), thpBackgroundId(itemId));
}

export function addNameTagAttachmentsToArray(array: any[], itemId: string) {
  array.push(getNameTagId(itemId));
}
