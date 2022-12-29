enum RadioMessage {
    message1 = 49434,
    touché = 2826,
    GAGNER = 52909
}
input.onButtonPressed(Button.A, function () {
    if (!(VIE == 0)) {
        sprite.change(LedSpriteProperty.X, -1)
        radio.sendValue("enn x", sprite.get(LedSpriteProperty.X))
    }
})
input.onButtonPressed(Button.B, function () {
    if (!(VIE == 0)) {
        sprite.change(LedSpriteProperty.X, 1)
        radio.sendValue("enn x", sprite.get(LedSpriteProperty.X))
    }
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
radio.onReceivedMessage(RadioMessage.GAGNER, function () {
    sprite.delete()
    ennemie.delete()
    for (let index = 0; index < 4; index++) {
        basic.showLeds(`
            # # # # #
            # # . # #
            . . . . .
            # . . . #
            . # # # .
            `)
        basic.pause(100)
        basic.showString("SCORE=" + SCORE)
    }
    control.reset()
})
input.onButtonPressed(Button.AB, function () {
    if (!(VIE == 0)) {
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
    }
})
radio.onReceivedMessage(RadioMessage.touché, function () {
    VIE += -1
})
let bullet: game.LedSprite = null
let ennemie_bullet: game.LedSprite = null
let SCORE = 0
let VIE = 0
let ennemie: game.LedSprite = null
let sprite: game.LedSprite = null
radio.setGroup(125)
sprite = game.createSprite(2, 4)
ennemie = game.createSprite(2, 0)
VIE = 3
SCORE = 0
basic.forever(function () {
    if (!(VIE == 0)) {
        radio.sendValue("enn x", sprite.get(LedSpriteProperty.X))
    }
    if (VIE == 0) {
        radio.sendMessage(RadioMessage.GAGNER)
        sprite.delete()
        ennemie.delete()
        for (let index = 0; index < 5; index++) {
            basic.showLeds(`
                . . . . .
                . # . # .
                . . . . .
                . # # # .
                # . . . #
                `)
            basic.pause(100)
            basic.showString("SCORE=" + SCORE)
        }
        control.reset()
    }
})
loops.everyInterval(1000, function () {
    if (!(VIE == 0)) {
        SCORE += 1
    }
})
