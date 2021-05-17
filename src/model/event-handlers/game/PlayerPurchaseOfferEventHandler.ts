import CellData from 'components/pages/game-page/data/CellData';
import PlayerPurchaseOfferEventPayload from 'model/dto/responses/ws/payload/game/PlayerPurchaseOfferEventPayload';
import WebSocketPayloadDto from 'model/dto/responses/ws/WebSocketPayloadDto';
import EventHandler from 'model/event-handlers/EventHandler';
import GameStateStorage from 'model/storage/GameStateStorage';

function showPurchaseActionButtons() {
  const purchaseActionContainerElement = <HTMLElement>(
    document.getElementsByClassName('property-purchase-action-container')[0]
  );

  purchaseActionContainerElement.style.display = 'flex';
}

export default class PlayerPurchaseOfferEventHandler implements EventHandler {
  private readonly propertyNameTextElementId = 'property-name';

  handleEvent(
    payloadDto: WebSocketPayloadDto<PlayerPurchaseOfferEventPayload>
  ): void {
    const { cellId } = payloadDto.payload;
    const { gamePageData } = GameStateStorage;

    if (gamePageData === null) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const cellData = <CellData>gamePageData.cells[`n${cellId}`];

    const { name } = cellData;

    if (name === null) {
      return;
    }

    const propertyNameElement = document.getElementById(
      this.propertyNameTextElementId
    );

    if (propertyNameElement === null) {
      return;
    }

    propertyNameElement.textContent = name;
    showPurchaseActionButtons();
  }
}
