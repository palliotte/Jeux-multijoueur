radio.onReceivedNumber(function (receivedNumber) {
    sprite2.set(LedSpriteProperty.X, receivedNumber)
})
input.onButtonPressed(Button.A, function () {
    sprite.change(LedSpriteProperty.X, -1)
    radio.sendNumber(sprite.get(LedSpriteProperty.X))
})
input.onButtonPressed(Button.B, function () {
    sprite.change(LedSpriteProperty.X, 1)
    radio.sendNumber(sprite.get(LedSpriteProperty.X))
})
let sprite2: game.LedSprite = null
let sprite: game.LedSprite = null
radio.setGroup(125)
sprite = game.createSprite(2, 4)
sprite2 = game.createSprite(2, 0)
