enum RadioMessage {
    message1 = 49434,
    touché = 2826
}
input.onButtonPressed(Button.A, function () {
    sprite.change(LedSpriteProperty.X, -1)
    radio.sendValue("enn x", sprite.get(LedSpriteProperty.X))
})
input.onButtonPressed(Button.B, function () {
    sprite.change(LedSpriteProperty.X, 1)
    radio.sendValue("enn x", sprite.get(LedSpriteProperty.X))
})
radio.onReceivedMessage(RadioMessage.touché, function () {
    game.removeLife(1)
})
input.onButtonPressed(Button.AB, function () {
    bullet = game.createSprite(sprite.get(LedSpriteProperty.X), 4)
    radio.sendValue("enn bul", bullet.get(LedSpriteProperty.X))
    for (let index = 0; index < 5; index++) {
        bullet.change(LedSpriteProperty.Y, -1)
        basic.pause(200)
        if (bullet.isTouching(ennemie)) {
            bullet.delete()
            radio.sendMessage(RadioMessage.touché)
        }
        if (ennemie_bullet) {
            if (bullet.isTouching(ennemie_bullet)) {
                ennemie_bullet.delete()
                bullet.delete()
            }
        }
    }
    bullet.delete()
})
radio.onReceivedValue(function (name, value) {
    if (name == "enn x") {
        ennemie.set(LedSpriteProperty.X, value)
    }
    if (name == "enn bul") {
        ennemie_bullet = game.createSprite(value, 0)
        for (let index = 0; index < 5; index++) {
            ennemie_bullet.change(LedSpriteProperty.Y, 1)
            basic.pause(200)
            if (ennemie_bullet.isTouching(sprite)) {
                ennemie_bullet.delete()
            }
            if (bullet) {
                if (bullet.isTouching(ennemie_bullet)) {
                    ennemie_bullet.delete()
                    bullet.delete()
                }
            }
        }
        ennemie_bullet.delete()
    }
})
let ennemie_bullet: game.LedSprite = null
let bullet: game.LedSprite = null
let ennemie: game.LedSprite = null
let sprite: game.LedSprite = null
radio.setGroup(125)
sprite = game.createSprite(2, 4)
ennemie = game.createSprite(2, 0)
game.setLife(3)
