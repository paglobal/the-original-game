function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomElement(elements) {
  return elements[Math.floor(Math.random() * elements.length)];
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function resolveAsteroidCollision(particle, otherParticle) {
  const xvelDiff = particle.vel.x - otherParticle.vel.x;
  const yvelDiff = particle.vel.y - otherParticle.vel.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  const m1 = particle.mass;
  const m2 = otherParticle.mass;

  if (xvelDiff * xDist >= 0 && yvelDiff * yDist >= 0) {
    const v1 = {
      x:
        (particle.vel.x * (m1 - m2)) / (m1 + m2) +
        (otherParticle.vel.x * 2 * m2) / (m1 + m2),
      y:
        (particle.vel.y * (m1 - m2)) / (m1 + m2) +
        (otherParticle.vel.y * 2 * m2) / (m1 + m2),
    };

    const v2 = {
      x:
        (otherParticle.vel.x * (m2 - m1)) / (m1 + m2) +
        (particle.vel.x * 2 * m2) / (m1 + m2),
      y:
        (otherParticle.vel.y * (m2 - m1)) / (m1 + m2) +
        (particle.vel.y * 2 * m2) / (m1 + m2),
    };

    particle.vel.x = v1.x;
    particle.vel.y = v1.y;

    otherParticle.vel.x = v2.x;
    otherParticle.vel.y = v2.y;
  } else if (yvelDiff * yDist >= 0) {
    const v1 = {
      x: particle.vel.x,
      y:
        (particle.vel.y * (m1 - m2)) / (m1 + m2) +
        (otherParticle.vel.y * 2 * m2) / (m1 + m2),
    };

    const v2 = {
      x: otherParticle.vel.x,
      y:
        (otherParticle.vel.y * (m2 - m1)) / (m1 + m2) +
        (particle.vel.y * 2 * m2) / (m1 + m2),
    };

    particle.vel.x = v1.x;
    particle.vel.y = v1.y;

    otherParticle.vel.x = v2.x;
    otherParticle.vel.y = v2.y;
  } else if (xvelDiff * xDist >= 0) {
    const v1 = {
      x:
        (particle.vel.x * (m1 - m2)) / (m1 + m2) +
        (otherParticle.vel.x * 2 * m2) / (m1 + m2),
      y: particle.vel.y,
    };
    const v2 = {
      x:
        (otherParticle.vel.x * (m2 - m1)) / (m1 + m2) +
        (particle.vel.x * 2 * m2) / (m1 + m2),
      y: otherParticle.vel.y,
    };

    particle.vel.x = v1.x;
    particle.vel.y = v1.y;

    otherParticle.vel.x = v2.x;
    otherParticle.vel.y = v2.y;
  }
}

function resolveShipCollision(particle, otherParticle) {
  const xvelDiff = particle.vel.x - otherParticle.vel.x;
  const yvelDiff = particle.vel.y - otherParticle.vel.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  const m1 = particle.mass;
  const m2 = otherParticle.mass;

  if (xvelDiff * xDist <= 0 && yvelDiff * yDist <= 0) {
    const v1 = {
      x:
        (particle.vel.x * (m1 - m2)) / (m1 + m2) +
        (otherParticle.vel.x * 2 * m2) / (m1 + m2),
      y:
        (particle.vel.y * (m1 - m2)) / (m1 + m2) +
        (otherParticle.vel.y * 2 * m2) / (m1 + m2),
    };

    const v2 = {
      x:
        (otherParticle.vel.x * (m2 - m1)) / (m1 + m2) +
        (particle.vel.x * 2 * m2) / (m1 + m2),
      y:
        (otherParticle.vel.y * (m2 - m1)) / (m1 + m2) +
        (particle.vel.y * 2 * m2) / (m1 + m2),
    };

    particle.vel.x = v1.x;
    particle.vel.y = v1.y;

    otherParticle.vel.x = v2.x;
    otherParticle.vel.y = v2.y;
  } else if (yvelDiff * yDist <= 0) {
    const v1 = {
      x: particle.vel.x,
      y:
        (particle.vel.y * (m1 - m2)) / (m1 + m2) +
        (otherParticle.vel.y * 2 * m2) / (m1 + m2),
    };

    const v2 = {
      x: otherParticle.vel.x,
      y:
        (otherParticle.vel.y * (m2 - m1)) / (m1 + m2) +
        (particle.vel.y * 2 * m2) / (m1 + m2),
    };

    particle.vel.x = v1.x;
    particle.vel.y = v1.y;

    otherParticle.vel.x = v2.x;
    otherParticle.vel.y = v2.y;
  } else if (xvelDiff * xDist <= 0) {
    const v1 = {
      x:
        (particle.vel.x * (m1 - m2)) / (m1 + m2) +
        (otherParticle.vel.x * 2 * m2) / (m1 + m2),
      y: particle.vel.y,
    };
    const v2 = {
      x:
        (otherParticle.vel.x * (m2 - m1)) / (m1 + m2) +
        (particle.vel.x * 2 * m2) / (m1 + m2),
      y: otherParticle.vel.y,
    };

    particle.vel.x = v1.x;
    particle.vel.y = v1.y;

    otherParticle.vel.x = v2.x;
    otherParticle.vel.y = v2.y;
  }
}
